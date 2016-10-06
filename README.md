# consus-flux

[![Build Status](https://travis-ci.org/TheFourFifths/consus-flux.svg?branch=dev)](https://travis-ci.org/TheFourFifths/consus-flux)
[![codecov](https://codecov.io/gh/TheFourFifths/consus-flux/branch/master/graph/badge.svg)](https://codecov.io/gh/TheFourFifths/consus-flux)
[![devDependency Status](https://david-dm.org/TheFourFifths/consus-flux/dev-status.svg)](https://david-dm.org/TheFourFifths/consus-flux?type=dev)

Flux modules for the Consus project

## Installing

`npm install consus-flux --save`

## Using the Dispatcher

```javascript
import { Dispatcher } from 'consus-flux';

Dispatcher.handleAction({
    type: 'INCREMENT',
    data: {
        amount: 5
    }
});
```

## Using the Store

```javascript
import { Store } from 'consus-flux';

let count = 0;

class CounterStore extends Store {

    getCount() {
        return count;
    }

}

const store = new CounterStore();

store.registerHandler('INCREMENT', data => {
    count += data.amount;
    store.emitChange();
});

store.registerHandler('DECREMENT', data => {
    count -= data.amount;
    store.emitChange();
});

export default store;
```

## Listening to a Store

```javascript
import CounterStore from './counter-store';

function handleChange() {
    console.log('The count is now: ' + CounterStore.getCount());
}

CounterStore.addChangeListener(handleChange);

setTimeout(() {
    CounterStore.removeChangeListener(handleChange);
}, 10000);
```

## Developing

### Getting Started

```bash
# Clone the repository
git clone git@github.com:TheFourFifths/consus-flux.git
# Enter the project directory
cd consus-flux
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

* `src`: The project's source code
* `test`: The project's tests
    * `lib`: Miscellaneous library modules
    * `unit`: Unit tests
