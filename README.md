# consus-flux

[![Build Status](https://travis-ci.org/TheFourFifths/consus-flux.svg?branch=master)](https://travis-ci.org/TheFourFifths/consus-flux)

Flux modules for the Consus project

## Installing

`npm install consus-flux --save`

## Using the Dispatcher

```javascript
import { Dispatcher } from 'consus-flux';

Dispatcher.handleAction({
    actionType: 'INCREMENT',
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

# Development scripts

* `npm test`: Run the test suite
* `npm run lint`: Run the linter
* `npm run build`: Build the usable `.dist` directory
