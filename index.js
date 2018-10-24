const fileParsers = require('./lib/file-parsers');
const parser = require('./lib/parser');

module.exports = {
    parseGlobs: parser.parseGlobs,
    parseFiles: parser.parseFiles,
    parseFile: parser.parseFile,
    types: fileParsers.types
};
