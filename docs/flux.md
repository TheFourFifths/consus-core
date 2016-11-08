# Flux

## Using the Dispatcher

```javascript
import { Dispatcher } from 'consus-core/flux';

Dispatcher.handleAction('INCREMENT', {
    amount: 5
});
```

## Using the Store

```javascript
import { Store } from 'consus-core/flux';

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

setTimeout(() => {
    CounterStore.removeChangeListener(handleChange);
}, 10000);
```
