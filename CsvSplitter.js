const Path = require('path');

const CsvReader = require('./CsvReader');
const CsvWriter = require('./CsvWriter');

const CsvSplitter = function() {};

CsvSplitter.prototype = {

    split: function(filepath, maxEntries, ouputDirectory) {
        this._csvReader = new CsvReader(filepath);

        this._amountOfFiles = Math.ceil((this._csvReader.length() - 1) / maxEntries);
        
        this._panLength = `${this._amountOfFiles}`.length;
        this._baseFileName = Path.basename(filepath, '.csv');

        this._outputDirectory = ouputDirectory || `${process.cwd() || '.'}/csv-splitter-output/`;
        if (this._outputDirectory[this._outputDirectory.length-1] !== '/') {
            this._outputDirectory += '/';
        }

        this._currentFile = 0;

        let csvWriter = new CsvWriter(this._csvReader.getHeader());

        console.info(`[CsvSplitter] Entries to process: ${this._csvReader.length()}`);
        console.info(`[CsvSplitter] Number of files to be written: ${this._amountOfFiles}`);

        // refactor with generator or stream, so you can use reader.nextLine() without looping indexes. I = 1 is error-prone.
        for (let i = 1; i < this._csvReader.length(); ++i) { //i = 1 to skip header
            if (i % maxEntries === 0) {

                csvWriter.write(this._getNextFileName());
                csvWriter = null;

                console.log(`[CsvSplitter] Wrote ${this._currentFile} / ${this._amountOfFiles} files`);

                if (this._currentFile <= this._amountOfFiles) {
                    csvWriter = new CsvWriter(this._csvReader.getHeader());
                }
            }

            if (csvWriter) csvWriter.addLine(this._csvReader.getLine(i));
        }

        if (csvWriter) {
            csvWriter.write(this._getNextFileName());
            console.log(`[CsvSplitter] Wrote ${this._currentFile} / ${this._amountOfFiles} files`);
        }

        console.info('[CsvSplitter] - DONE');
    },

    _getNextFileName: function() {
        ++this._currentFile;
        let paddedNumber = this._padNumber(this._currentFile);
        return `${this._outputDirectory}${this._baseFileName}_${paddedNumber}.csv`;
    },

    _padNumber: function(number, digits) {
        let numLength = `${number}`.length;
        let complementaryZeroes = new Array(this._panLength - numLength).fill(0).join('');
        return `${complementaryZeroes}${number}`;
    }

};

module.exports = new CsvSplitter();
