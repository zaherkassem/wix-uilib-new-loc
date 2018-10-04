define([], function () {

    return {
        translationMixin:{
                    translateIfNeeded:function(str) {
                        return str;
                    }
            },
        media: {
            getMediaUrl: function(item) {
                return 'http://static.parastorage.com/services/santa-resources/resources/editor/' + item;
            }
        }
    };
});