# consus-core

[![Build Status](https://travis-ci.org/TheFourFifths/consus-core.svg?branch=dev)](https://travis-ci.org/TheFourFifths/consus-core)
[![codecov](https://codecov.io/gh/TheFourFifths/consus-core/branch/dev/graph/badge.svg)](https://codecov.io/gh/TheFourFifths/consus-core)
[![npm](https://img.shields.io/npm/v/consus-core.svg)](https://www.npmjs.com/package/consus-core)
[![devDependency Status](https://david-dm.org/TheFourFifths/consus-core/dev-status.svg)](https://david-dm.org/TheFourFifths/consus-core?type=dev)

Common modules for the Consus project

## Installing

`npm install consus-core --save`

## Submodules

* [Clone](docs/clone.md)
* [Flux](docs/flux.md)
* [Identifiers](docs/identifiers.md)

## Developing

### Getting Started

```bash
# Clone the repository
git clone git@github.com:TheFourFifths/consus-core.git
# Enter the project directory
cd consus-core
# Install dependencies
npm install
# Build the project
npm run build
# Run the test suite
npm test
```

### Development Scripts

* `npm test`: Run the test suite
* `npm run lint`: Run the linter
* `npm run build`: Build the usable `.dist` directory
* `npm run coverage`: Generate a code coverage report

### Project File Structure

* `docs`: Project documentation goes here
* `src`: The project's source code
* `test`: The project's tests
