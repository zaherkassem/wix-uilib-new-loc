var _ = require("lodash");

module.exports = function(source) {

    if (!this.request) {
        return source;
    }

    var lines = source.split(/\n\r?/);

    lines = _.map(lines, function(line) {
        line = line.replace(/'pLoader!(.*):(.*)'/g, "'$2'");
        //line = line.replace(/'util'/g, "'santaemu-util'");
        return line;
    });

    return lines.join("\n");
};