import { Store } from '../../.dist/index';

let count = 0;

class CounterStore extends Store {

    getCount() {
        return count;
    }

}

const store = new CounterStore();

store.registerHandler('RESET', () => {
    count = 0;
    store.emitChange();
});

store.registerHandler('INCREMENT', data => {
    if (typeof data === 'object') {
        count += data.amount;
    } else {
        count += 1;
    }
    store.emitChange();
});

store.registerHandler('DECREMENT', data => {
    if (typeof data === 'object') {
        count -= data.amount;
    } else {
        count -= 1;
    }
    store.emitChange();
});

export default store;
