var React = require('react');
var Wix = require('Wix');
var template = require('./settings.rt');

var IMAGES_DATA_KEY = 'images';

var app = React.createClass({
    getInitialState: function () {
        return {
            dock: 'TOP',
            radioButtonsValue: 1,
            images: []
        };
    },
    learnMore: function () {
        console.log('learn more');
    },

    /////////////////////////////
    // image preview stuff //////
    /////////////////////////////
    getImages: function () {
        return this.state.images;
    },

    addImage: function (images) {
        images = _.isArray(images) ? images : [images];
        var nextImagesState = this.state.images.concat(images);
        this.setState({
            images: nextImagesState
        });
    },

    emptyImages: function () {
        this.setState({
            images: []
        });
    },

    openMediaDialog: function () {
        Wix.Settings.openMediaDialog(Wix.Settings.MediaType.IMAGE, false, this.addImage);
    },

    componentDidMount: function () {
        var _this = this;
        Wix.Data.Public.get(IMAGES_DATA_KEY, { scope: 'APP' }, function (data) {
            _this.setState({
                images: data[IMAGES_DATA_KEY].value
            });
        }, _.noop);
    },

    isEmpty: function () {
        return !this.state.images.length;
    },

    handleChange: function (value) {
        Wix.Data.Public.set(IMAGES_DATA_KEY, {value: value}, { scope: 'APP' }, _.noop);
    },

    getButtons: function () {
        if (this.isEmpty()) {
            return [{
                label: 'Add Image',
                icon: 'plus',
                onClick: this.openMediaDialog.bind(this)
            }];
        } else {
            return [{
                label: 'Delete',
                icon: 'delete',
                tooltip: 'hello! how are you?',
                onClick: this.emptyImages.bind(this)
            },{
                label: 'Change',
                icon: 'image-change',
                onClick: this.openMediaDialog.bind(this)
            }];
        }
    },
    ////////////////////////////////////
    // end of image preview stuff //////
    ////////////////////////////////////

    render: template
});

React.render(React.createElement(app), document.getElementById('app'));