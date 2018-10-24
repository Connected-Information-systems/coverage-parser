const _ = require('lodash');
const path = require('path');
const Promise = require('bluebird');
const fastGlob = require('fast-glob');
const fileParsers = require('./file-parsers');

module.exports = {
    parseGlobs,
    parseFiles,
    parseFile
};

function parseGlobs(globs, options) {
    return fastGlob(globs, _.defaults({absolute: true}, options.globOptions))
        .then(files => parseFiles(files, options));
}

function parseFiles(files, options) {
    return Promise
        .map(files, file => parseFile(file, options))
        .then(filesResults => _.flatten(filesResults))
}

function parseFile(file, options) {
    options = _.defaults(options, {
        baseDir: process.cwd(),
        pathMode: 'absolute',
        type: null,
        parser: null,
        filter: null
    });
    return Promise.resolve()
        .then(() => fileParsers.get(options))
        .then(parser => parser(file))
        .then(results => normalizePaths(results, options))
        .then(results => options.filter ? _.filter(results, options.filter) : results)
}

function normalizePaths(results, options){
    switch (options.pathMode) {
        case 'absolute':
            results.forEach(result => result.file = path.resolve(options.baseDir, result.file));
            break;

        case 'relative':
            results.forEach(result => result.file = path.isAbsolute(result.file) ? path.relative(options.baseDir, result.file) : result.file);
            break;

        case 'unmodified':
            break;
    }
    return results;
}