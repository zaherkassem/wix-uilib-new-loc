define(['react', 'lodash', 'baseUI/panelInputs/richTextParagraph.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'RichTextParagraph',
        propTypes: {
            paragraphTitle: React.PropTypes.string,
            paragraphTextChunks: React.PropTypes.array
        },
        render: template
    });
});
