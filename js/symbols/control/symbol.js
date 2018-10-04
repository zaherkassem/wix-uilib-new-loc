define(['react', 'lodash', 'symbols/data/symbols', 'symbols/control/symbol.rt'], function (React, _, symbols, template) {
    'use strict';

    return React.createClass({
        displayName: 'Symbol',
        propTypes: {
            name: React.PropTypes.string.isRequired,
            className: React.PropTypes.string,
            onClick: React.PropTypes.func,
            style: React.PropTypes.object
        },
        getSvgDef: function () {
            var ret = symbols[this.props.name];
            if (!ret) {
                console.error('SVG symbol %s does not exist', this.props.name);
            }
            return ret || {content: (<path/>), svg: {}};
        },
        // TODO: Move this into a mixin & search for all occurrences
        getClassName: function(defaultClassName) {
            return (defaultClassName ? defaultClassName : '') + (this.props.className ? ' ' + this.props.className : '');
        },
        render: template
    });
});