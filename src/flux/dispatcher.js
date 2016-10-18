/**
 * A flux Dispatcher class, used as a singleton
 */
class Dispatcher {

    /**
     * Instantiate a Dispatcher
     */
    constructor() {
        this.reset();
    }

    /**
     * Register a listener callback
     */
    register(listener) {
        let dispatchToken = 'DISPATCH_TOKEN_' + this.nextTokenId;
        this.listeners[dispatchToken] = listener;
        this.nextTokenId ++;
        return dispatchToken;
    }

    /**
     * Unregister a listener callback by its dispatch token
     */
    unregister(dispatchToken) {
        if (typeof this.listeners[dispatchToken] !== 'function') {
            throw new Error('Dispatch token not registered: ' + dispatchToken);
        }
        delete this.listeners[dispatchToken];
    }

    /**
     * Attempt to call a listener with the current action
     */
    callListener(dispatchToken) {
        if (typeof this.listeners[dispatchToken] !== 'function') {
            throw new Error('Dispatch token not registered: ' + dispatchToken);
        }
        if (this.currentAction === null) {
            throw new Error('An action is not currently being handled.');
        }
        if (typeof this.calledListeners[dispatchToken] !== 'function') {
            this.listeners[dispatchToken](this.currentAction);
            this.calledListeners[dispatchToken] = this.listeners[dispatchToken];
        }
    }

    /**
     * Wait for a listener to be called
     */
    waitFor(dispatchToken) {
        this.callListener(dispatchToken);
    }

    /**
     * Pass an action to the dispatcher which will be sent to listeners
     */
    handleAction(type, data) {
        this.calledListeners = Object.create(null);
        this.currentAction = {
            type,
            data
        };
        Object.keys(this.listeners).forEach(dispatchToken => this.callListener(dispatchToken));
    }

    /**
     * Set up fresh attributes
     */
    reset() {
        this.listeners = Object.create(null);
        this.calledListeners = Object.create(null);
        this.currentAction = null;
        this.nextTokenId = 0;
    }

}

/**
 * Export a singleton dispatcher
 */
export default new Dispatcher();
