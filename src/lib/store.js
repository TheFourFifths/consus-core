import Dispatcher from './dispatcher';
import { EventEmitter } from 'events';

const CHANGE_EVENT = Symbol();

/**
 * A flux Store class, meant to be extended
 */
export default class Store extends EventEmitter {

    /**
     * Instantiate a Store
     */
    constructor() {
        super();
        this.handlers = {};
        this.setMaxListeners(0);
        this.registerWithDispatcher();
    }

    /**
     * Wait for the provided Store to process the current action
     */
    waitFor(store) {
        Dispatcher.waitFor(store.dispatchToken);
    }

    /**
     * Register for actions from the Dispatcher
     */
    registerWithDispatcher() {
        this.dispatchToken = Dispatcher.register(action => {
            if (this.handlers.hasOwnProperty(action.type)) {
                this.handlers[action.type](action.data);
            }
        });
    }

    /**
     * Register a new action handler
     */
    registerHandler(type, handler) {
        if (typeof this.handlers[type] !== 'undefined') {
            throw new Error('This Store is already handling the ' + type + ' action.');
        }
        this.handlers[type] = handler;
    }

    /**
     * Emit a change event to all of this Store's subscribers
     */
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    /**
     * Subscribe for change events from this Store
     */
    addChangeListener(listener) {
        this.on(CHANGE_EVENT, listener);
    }

    /**
     * Unsubscribe from change events from this Store
     */
    removeChangeListener(listener) {
        this.removeListener(CHANGE_EVENT, listener);
    }

}
