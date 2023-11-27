# @anio-sh/runmocha

Runs unit tests with [mocha](https://github.com/mochajs/mocha).

## Usage

`anio_runmocha <tests_directory>`.

Only files ending with `.test.mjs` will be added to the unit test suite.

When executing the unit tests, the process' current working directory will be set to `<tests_directory>`.
