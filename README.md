# csv-splitter
A command line and Node JS tool to split CSV files

#### Motivations
Some CSVs are really big and hard to process.
This tool is here to help you split them in different parts.

### Installation

You can downlad this from npm:
```
npm install csv-splitter
```

Or install it from this repo, by running `npm install` in the root directory.

>   [TIP] If you want to use this utility from the command line and system-wide, just add the `-g` option to the npm install command.

### CLI Usage

```
csv-splitter <input-file> <max-rows> [options]
```

This will split the `<input-file>`, making sure that every part has at most `<max-rows>`.

The only option is `-o <output-directory>`, which allows you to specify where to place the parts files (It will be created if necessary), by default it's the current working directory.



### NodeJS Usage

```
const CsvSplitter = require('csv-splitter');
```

```
CsvSplitter.split(filepath, maxEntries, ouputDirectory);
```

Where `ouputDirectory` is the only optional parameter, default to the current working directory.
