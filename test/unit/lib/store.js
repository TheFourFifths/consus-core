import { assert } from 'chai';
import Store from '../../../.dist/lib/store';

describe('Store', () => {

    describe('#constructor', () => {

        it('should create a new Store', () => {
            assert.instanceOf(new Store(), Store);
        });

    });

});
