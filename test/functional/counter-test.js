import { assert } from 'chai';
import sinon from 'sinon';
import { Dispatcher } from '../../.dist/index';
import CounterStore from './counter-store';

describe('Counter', () => {

    let spyA = sinon.spy();
    let spyB = sinon.spy();

    it('should start at 0', () => {
        assert.strictEqual(CounterStore.getCount(), 0);
    });

    it('should add change listeners', () => {
        CounterStore.addChangeListener(spyA);
        CounterStore.addChangeListener(spyB);
    });

    it('should increment the default amount', () => {
        Dispatcher.handleAction('INCREMENT');
        assert.strictEqual(CounterStore.getCount(), 1);
        assert.strictEqual(spyA.callCount, 1);
        assert.strictEqual(spyB.callCount, 1);
    });

    it('should increment by a given amount', () => {
        Dispatcher.handleAction('INCREMENT', {
            amount: 5
        });
        assert.strictEqual(CounterStore.getCount(), 6);
        assert.strictEqual(spyA.callCount, 2);
        assert.strictEqual(spyB.callCount, 2);
    });

    it('should decrement by the default amount', () => {
        Dispatcher.handleAction('DECREMENT');
        assert.strictEqual(CounterStore.getCount(), 5);
        assert.strictEqual(spyA.callCount, 3);
        assert.strictEqual(spyB.callCount, 3);
    });

    it('should decrement by a given amount', () => {
        Dispatcher.handleAction('DECREMENT', {
            amount: 3
        });
        assert.strictEqual(CounterStore.getCount(), 2);
        assert.strictEqual(spyA.callCount, 4);
        assert.strictEqual(spyB.callCount, 4);
    });

    it('should remove a change listener', () => {
        CounterStore.removeChangeListener(spyB);
    });

    it('should reset the counter', () => {
        Dispatcher.handleAction('RESET');
        assert.strictEqual(CounterStore.getCount(), 0);
        assert.strictEqual(spyA.callCount, 5);
        assert.strictEqual(spyB.callCount, 4);
    });

});
