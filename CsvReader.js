const readFileSync = require('fs').readFileSync;
const EOL = require('os').EOL;

const CsvReader = function(filepath) {
    this._parseFile(filepath);
    this._header = this._getLine(0);
};

CsvReader.prototype = {

    getHeader: function() {
        return this._header;
    },

    /**
    /* Public interface to _getLine, this avoids getting the header, that is line with index 0
    **/
    getLine: function(index) {
        if (index === 0) throw new Error(`[${this.constructor.name}] - Trying to access line 0, if you want to read the header use \`getHeader()\``);
        return this._getLine(index);
    },

    length: function() {
        return this._fileLines.length;
    },

    _getLine: function(index) {
        return this._fileLines[index];
    },

    _parseFile: function(filepath) {
        this._fileLines = [];

        try {

            this._fileLines = readFileSync(filepath, 'utf-8').split(EOL).filter(Boolean);
            console.info(`[CsvSplitter] File parsed: ${filepath}, read ${this._fileLines.length} lines`);

        } catch (err) {
            throw new Error(`[${this.constructor.name}] - Unable to read file: ${filepath} \n Original error attached`, err);
        }
    }
};

module.exports = CsvReader;
