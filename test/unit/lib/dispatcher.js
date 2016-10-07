import sinon from 'sinon';
import { assert } from 'chai';
import Dispatcher from '../../../.dist/lib/dispatcher';

describe('Dispatcher', () => {

    beforeEach(Dispatcher.reset);

    describe('#register', () => {

        it('should register listeners', () => {
            let spyA = sinon.spy();
            let spyB = sinon.spy();
            assert.strictEqual(Dispatcher.register(spyA), 'DISPATCH_TOKEN_0');
            assert.isFalse(spyA.called);
            assert.strictEqual(Dispatcher.register(spyB), 'DISPATCH_TOKEN_1');
            assert.isFalse(spyB.called);
        });

    });

    describe('#callListener', () => {

        it('should call listeners', () => {
            let spyA = sinon.spy();
            let spyB = sinon.spy();
            let tokenA = Dispatcher.register(spyA);
            let tokenB = Dispatcher.register(spyB);
            Dispatcher.currentAction = {};
            Dispatcher.callListener(tokenA);
            assert.isTrue(spyA.calledOnce);
            assert.isFalse(spyB.called);
            Dispatcher.callListener(tokenB);
            assert.isTrue(spyA.calledOnce);
            assert.isTrue(spyB.calledOnce);
        });

        it('should not call a listener twice with one action', () => {
            let spy = sinon.spy();
            let token = Dispatcher.register(spy);
            Dispatcher.callListener(token);
            assert.isTrue(spy.calledOnce);
            Dispatcher.callListener(token);
            assert.isTrue(spy.calledOnce);
        });

    });

    describe('#waitFor', () => {

        it('should wait for a listener', () => {
            let spyA = sinon.spy();
            let spyB = sinon.spy();
            let tokenA = Dispatcher.register(spyA);
            Dispatcher.register(spyB);
            Dispatcher.currentAction = {};
            Dispatcher.waitFor(tokenA);
            assert.isTrue(spyA.calledOnce);
            assert.isFalse(spyB.called);
        });

        it('should skip a listener that has been called', () => {
            let spy = sinon.spy();
            let token = Dispatcher.register(spy);
            Dispatcher.callListener(token);
            assert.isTrue(spy.calledOnce);
            Dispatcher.waitFor(token);
            assert.isTrue(spy.calledOnce);
        });

    });

    describe('#handleAction', () => {

        it('should handle actions', () => {
            let spyA = sinon.spy();
            let spyB = sinon.spy();
            Dispatcher.register(spyA);
            Dispatcher.register(spyB);
            Dispatcher.handleAction({});
            assert.isTrue(spyA.calledOnce);
            assert.isTrue(spyB.calledOnce);
            Dispatcher.handleAction({});
            assert.isTrue(spyA.calledTwice);
            assert.isTrue(spyB.calledTwice);
        });

    });

    describe('#unregister', () => {

        it('should unregister listeners', () => {
            let tokenA = Dispatcher.register(sinon.spy());
            let tokenB = Dispatcher.register(sinon.spy());
            Dispatcher.unregister(tokenA);
            assert.isUndefined(Dispatcher.listeners[tokenA]);
            assert.isFunction(Dispatcher.listeners[tokenB]);
            Dispatcher.unregister(tokenB);
            assert.isUndefined(Dispatcher.listeners[tokenA]);
            assert.isUndefined(Dispatcher.listeners[tokenB]);
        });

    });

});
