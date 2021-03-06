const _ = require('lodash');
const Promise = require('bluebird');

const parsersByType = {
    'lcov': Promise.promisify(require('lcov-parse')),
    'cobertura': Promise.promisify(require('cobertura-parse').parseFile),
    'golang-cover': Promise.promisify(require('golang-cover-parse').parseFile),
    'jacoco': Promise.promisify(require('jacoco-parse').parseFile),
    'clover': require('@cvrg-report/clover-json').parseFile
};

const types = _.keys(parsersByType);

module.exports = {
    byType: parsersByType,
    types,
    get
};

function get({ parser, type }){
    parser = parser || parsersByType[type];
    if (!parser) {
        throw new Error(`Unknown coverage type: ${type}. Supported types are: ${types}`);
    }
    return parser;
}
