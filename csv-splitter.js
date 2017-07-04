#!/usr/bin/env node
const options = require('yargs');

const CsvSplitter = require('./CsvSplitter');

options
    .usage( "\nUsage: $0 <input-file> <max-rows> [options]" )
    .command( "input-file", "File to process", { alias: "input" } )
    .command( "max-rows", "Maximum amount of rows per file", { alias: "max" } )
    .option('o', {
          alias : 'output-dir',
          describe: 'Specify an output directory for the part files, default is current working directory',
          type: 'string',
          nargs: 1
    });

let inputFile = options.argv._[0];
let maxRows = options.argv._[1];
let outputDir = options.argv.o;

if (!inputFile) {
    console.error('\n[Error] {Not enough arguments} No input file specified.');
    options.showHelp();
    process.exit(1);
}

if (!maxRows) {
    console.error('\n[Error] {Not enough arguments} No max-entries amount specified.');
    options.showHelp();
    process.exit(1);
}


CsvSplitter.split(inputFile, maxRows, outputDir);
