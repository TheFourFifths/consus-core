import { assert } from 'chai';
import { Store } from '../../../flux';

describe('Store', () => {

    describe('#constructor', () => {

        it('should create a new Store', () => {
            assert.instanceOf(new Store(), Store);
        });

    });

});
