/**
 * based on ngReact with modifications for wix
 * EUse Wix React UI-Lib Components inside of your settings written with Angular
 *
 * Composed of:
 * wixControl (generic directive for delegating off to UI-lib React Components)
 *
 * @param name - a name is one of the available react components under the UI namespace on the window. See documentation for available components here https://dev.wix.com/docs/ui-lib/ui-controls/
 * @param $injector - angular injector
 */

'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var angular = require('angular');

/**
 * Find a react component from name (components can be an angular injectable e.g. value, factory or available on window)
 * Editor-ui-lib components are available on the window under the UI namespace
 *
 * @param name - a name is one of the available react components under the UI namespace on the window. See documentation for available components here https://dev.wix.com/docs/ui-lib/ui-controls/
 * @param $injector - angular injector
 */
function getReactComponent( name, $injector ) {
  // if name is a function assume it is component and return it
  if (angular.isFunction(name)) {
    return name;
  }

  // a React component name must be specified
  if (!name) {
    throw new Error('editor-ui-lib: UI component name attribute must be specified. See docs here: https://dev.wix.com/docs/ui-lib/ui-controls/');
  }

  // ensure the specified React component is accessible, and fail fast if it's not
  var reactComponent;
  try {
    reactComponent = $injector.get(name);
  } catch(e) { }

  if (!reactComponent) {
    try {
      reactComponent = name.split('.').reduce(function(current, namePart) {
        return current[namePart];
      }, window);
    } catch (e) { }
  }

  if (!reactComponent) {
    throw Error('editor-ui-lib: Cannot find react component ' + name);
  }

  return reactComponent;
}

/**
 * wraps a function with scope.$apply, if already applied just return
 *
 * @param fn - a function to be wrapped
 * @param scope - angular scope
 */
function applied(fn, scope) {
  if (fn.wrappedInApply) {
    return fn;
  }
  var wrapped = function() {
    var args = arguments;
    var phase = scope.$root.$$phase;
    if (phase === "$apply" || phase === "$digest") {
      return fn.apply(null, args);
    } else {
      return scope.$apply(function() {
        return fn.apply( null, args );
      });
    }
  };
  wrapped.wrappedInApply = true;
  return wrapped;
}

/**
 * wraps all functions on props obj in scope.$apply
 *
 * @param obj - the props object that contains functions to be wrapped
 * @param scope - angular scope
 */
function applyFunctions(obj, scope) {
  return Object.keys(obj || {}).reduce(function(prev, key) {
    var value = obj[key];
    // wrap functions in a function that ensures they are scope.$applied
    // ensures that when function is called from a React component
    // the Angular digest cycle is run
    prev[key] = angular.isFunction(value) ? applied(value, scope) : value;
    return prev;
  }, {});
}

/**
 * Uses the watchDepth attribute to determine how to watch props on scope.
 * If watchDepth attribute is NOT reference or collection, watchDepth defaults to deep watching by value
 *
 * @param watchDepth - value of HTML watch-depth attribute. Options are collection, reference or unspecified
 * @param scope - angular scope
 * @param watchExpressions - the expression to be watched
 * @param listener - a function to be called when the property changes
 *
 */
function watchProps (watchDepth, scope, watchExpressions, listener){
  if (watchDepth === 'collection' && angular.isFunction(scope.$watchCollection)) {
    watchExpressions.forEach(function(expr){
      scope.$watchCollection(expr, listener);
    });
  }
  else if (watchDepth === 'reference') {
    if (angular.isFunction(scope.$watchGroup)) {
      scope.$watchGroup(watchExpressions, listener);
    }
    else {
      watchExpressions.forEach(function(expr){
        scope.$watch(expr, listener);
      });
    }
  }
  else {
    //default watchDepth to value if not reference or collection
    watchExpressions.forEach(function(expr){
      scope.$watch(expr, listener, true);
    });
  }
}

/**
 * Determine if a node should be ignored by the transclude function
 *
 * @param node - the dom node to test
 */
function isIgnorable(node) {
  return node.nodeType === 8 || (node.nodeType === 3 && !new RegExp('/[^\t\n\r]/').test(node.textContent)); // a text node, all whitespace
}

/**
 * A React component that interacts with the browser and wraps the DOM nodes
 * This is the trick in the angular wrapper:
 * We are adding a ref function to a span react node. When the node is added to the dom (not the vdom), then this function is called
 * Then we add the elements that are in the props. The elements are the children of the comonents that were detected using a transclude function
 *
 */
var ElementsWrapper = React.createClass({
  appendElements: function(component) {
    if(this.props.elements && component) {
      var node = ReactDOM.findDOMNode(component);
      angular.forEach(this.props.elements, function(elem) {
        if(!isIgnorable(elem)) {
          node.appendChild(elem);
        }
      });
    }
  },
  render: function() {
    return React.createElement('span', {ref: this.appendElements});
  }
});

/**
 * Directive that allows editor-ui-lib react components to be used in Angular templates.
 * Usage example:
 * <wix-control name="UI.sectionDividerLabeled" props="{label: 'Enable functionality'}"></wix-control>
 * See list of controls here: https://dev.wix.com/docs/ui-lib/ui-controls/
 *
 * This requires that there exists an injectable or globally available 'UI.sectionDividerLabeled' React component.
 * The editor-ui-lib injects these to the window.
 * All ui controls exists on the window under the UI namespace
 *
 * Available attributes:
 * @attrs name - the name of the editor-ui-lib component
 * @attrs props - (optional) the list of props to be passed to the component
 * @attrs ref - (optional) a string that defined the variable name that will injected to the scope under the $scope.refs object. This variable is a pointer to the react object with all methods and variables it exposes
 * @attrs watchDepth - (optional) should the props be watched as a string or as a collection or as reference - best used undefined
 * @attrs onScopeDestroy - (optional) a function to be called when the element is destroyed
 *
 * @param $injector - angular injectable
 */
var wixControl = function($injector) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: false,
    link: function (scope, elem, attrs, ctrl, transcludeFn) {

      //if transclusion function is defined, create a React component that wraps the transcluded content
      var children = [];
      var transContent;
      if(transcludeFn) {
        transcludeFn(function(clone){
          transContent = clone;
          if(transContent) {
            angular.forEach(transContent, function(child) {
              if(!isIgnorable(child)) {
                var childProps = {
                  elements: [child],
                  key: children.length
                };
                //special case to handle panelTans since the control expects to find the tab prop on children during the vdom process
                //the rest of the child element will be added when the element is passed to the dom
                if(attrs.name == 'UI.panelTabs' && child.getAttribute('tab')) {
                  var tabName = scope.$eval(child.getAttribute('tab'));
                  if (typeof tabName == 'undefined') {
                    tabName = child.getAttribute('tab');
                  }
                  childProps.tab = tabName;
                  
                  if (!!childProps.tab) {
                    children.push(React.createElement(ElementsWrapper, childProps));
                  }
                }
                else {
                  //wrap the child with a wrapper that will hook into the lifecycle and add it to the dom via jquery
                  children.push(React.createElement(ElementsWrapper, childProps));
                }
              }
            });
          }
        });
      }

      var renderMyComponent = function () {
        var scopeProps = scope.$eval(attrs.props);
        var props = applyFunctions(scopeProps, scope);
        var reactComponent = getReactComponent(attrs.name, $injector);
        scope.$eval(function() {
          //we must add children that are react element since some components (e.g. panelTabs) are looking for their children on vdom before continuing
          var reactObjectElement = ReactDOM.render(React.createElement(reactComponent, props, children), elem[0]);

          //allow the developer to define ref attribute with the name of the object. If that exists, add the react object to the refs scope element
          if (typeof attrs.ref == 'string') {
            if(typeof scope.$parent.refs != 'object') {
              scope.$parent.refs = {};
            }
            scope.$parent.refs[attrs.ref] = reactObjectElement;
          }
        });
      };

      // If there are props, re-render when they change
      attrs.props ?
        watchProps(attrs.watchDepth, scope, [attrs.props], renderMyComponent) :
        renderMyComponent();

      // cleanup when scope is destroyed
      scope.$on('$destroy', function() {
        if (!attrs.onScopeDestroy) {
          ReactDOM.unmountComponentAtNode(elem[0]);
        } else {
          scope.$eval(attrs.onScopeDestroy, {
            unmountComponent: ReactDOM.unmountComponentAtNode.bind(this, elem[0])
          });
        }
      });
    }
  };
};

/**
 * Create a WixControls module that could be injected to apps.
 * To use this directive, you should add the 'WixControls' angular as a module to your app
 *
 * Usage example:
 * var app = angular.module('StarterApp', ['WixControls']);
 *
 */
module.exports = angular.module('WixControls', [])
  .directive('wixControl', ['$injector', wixControl]);
