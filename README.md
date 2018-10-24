# coverage-parser
> A Node.js library for parsing coverage reports. 

[![NPM version][npm-image]][npm-url][![Dependency Status][depstat-image]][depstat-url]

This library bundles different coverage parsers that parse coverage information in a uniform way. 
Supported coverage report formats:
- [lcov](https://www.npmjs.com/package/lcov-parse)
- [cobertura](https://www.npmjs.com/package/cobertura-parse)
- [clover](https://www.npmjs.com/package/@cvrg-report/clover-json)
- [jacoco](https://www.npmjs.com/package/jacoco-parse)
- [golang-cover](https://www.npmjs.com/package/@cvrg-report/golang-cover-json)

## API
The API includes the following:
- parseGlobs(globs, options)
- parseFiles(files, options)
- parseFile(file, options)
- types

### types
Type `Array<string>`

Array of available parser types.

### options
Type `object`

##### options.type
Type: `string`

The type of parser which should be used for parsing the coverage files. See the exported `types` array for available types.

##### options.parser
Type: `function`

Custom parser function for parsing the coverage files: `(file) => Promise<Array<CoverageResult>>`. See below.

##### options.pathMode
Type: `'absolute' | 'relative' | 'unmodified'`

Default: `'absolute'`

The type of paths that should be used in the parsed result. See `options.baseDir`.

##### options.baseDir
Type: `string`

Default: `process.cwd()`

The base directory that will be used for making paths relative or absolute in the coverage reports. See `options.pathMode`.

### parseGlobs(globs, options)
Finds all coverage reports matching the glob patterns and parses the results.

#### globs
Type: `Array<string>`

An array of [glob patterns](https://www.npmjs.com/package/fast-glob).

#### options
Type: `options`. See above.

##### options.globOptions
Type: `object`

Options to pass to [fast-glob]((https://www.npmjs.com/package/fast-glob)).

#### returns
Type: `Promise<Array<CoverageResult>>`. See below.

### parseFiles(files, options)
Parses all coverage reports files.

#### files
Type: `Array<string>`

An array of file paths.

#### options
Type: `options`. See above.

#### returns
Type: `Promise<Array<CoverageResult>>`. See below.

### parseFile(file, options)
Parses the coverage reports file.

#### file
Type: `string`

The file path.

#### options
Type: `options`. See above.

#### returns
Type: `Promise<Array<CoverageResult>>`. See below.

### CoverageResult
The returned data has the following format.

``` json
 {
    "title": "Test #1",
    "file": "/some/absolute/path/anim-base/anim-base-coverage.js",
    "functions": {
      "hit": 23,
      "found": 29,
      "details": [
        {
          "name": "(anonymous 1)",
          "line": 7,
          "hit": 6
        },
        {
          "name": "(anonymous 2)",
          "line": 620,
          "hit": 225
        },
        {
          "name": "_end",
          "line": 516,
          "hit": 228
        }
      ]
    }
    "lines": {
      "found": 181,
      "hit": 143,
      "details": [
        {
          "line": 7,
          "hit": 6
        },
        {
          "line": 29,
          "hit": 6
        },
        {
          "line": 41,
          "hit": 0
        }        
      ]
    }
}

```

[npm-url]: https://www.npmjs.org/package/@connectis/coverage-parser
[npm-image]: https://badge.fury.io/js/%40connectis%2Fcoverage-parser.svg

[depstat-url]: https://david-dm.org/Connected-Information-systems/coverage-parser
[depstat-image]: https://david-dm.org/Connected-Information-systems/coverage-parser.svg