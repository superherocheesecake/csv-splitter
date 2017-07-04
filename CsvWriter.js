const writeFileSync = require('fs').writeFileSync;
const Path = require('path');
const EOL = require('os').EOL;
const mkdirp = require('mkdirp');

const CsvWriter = function(header) {
    this._fileLines = [];
    if (header) this.setHeader(header);
};

CsvWriter.prototype = {

    setHeader: function(headerString) {
        this._header = headerString;
    },

    addLine: function(line) {
        this._fileLines.push(line);
    },

    write: function(filepath) {
        var combinedLines = this._combineLines(this._header, this._fileLines);
        this._writeFile(filepath, combinedLines);
    },

    _combineLines: function(header, lines) {
        var combinedLines = `${header}${EOL}`;
        lines.forEach(l => combinedLines += `${l}${EOL}`);
        return combinedLines;
    },

    _writeFile: function(filepath, lines) {

        //Safe dir creation, if already exists is no-op
        mkdirp(Path.dirname(filepath));

        if (!this._header) throw new Error(`[${this.constructor.name}] - Can't write ${filepath}, you didn't specify any header.`);
        writeFileSync(filepath, lines);

    }

};

module.exports = CsvWriter;
