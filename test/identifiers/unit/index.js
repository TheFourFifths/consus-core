import { assert } from 'chai';
import { createAddress, readAddress } from '../../../identifiers';

describe('Identifiers', () => {

    describe('#createAddress', () => {

        it('should create a model address', () => {
            assert.strictEqual(createAddress(123, 'model'), 'm8y7nxSMe');
        });

        it('should create an item address', () => {
            assert.strictEqual(createAddress(123, 'item'), 'iGwEaCH6f');
        });

        it('should not accept a negative index', () => {
            assert.throws(() => {
                createAddress(-123, 'item');
            });
        });

        it('should not accept a huge index', () => {
            assert.throws(() => {
                createAddress(Number.MAX_SAFE_INTEGER, 'item');
            });
        });

        it('should require an item or model type', () => {
            assert.throws(() => {
                createAddress(123, 'potato');
            });
        });

    });

    describe('#readAddress', () => {

        it('should read a model address', () => {
            assert.strictEqual(readAddress('m8y7nxSMe').index, 123);
            assert.strictEqual(readAddress('m8y7nxSMe').type, 'model');
        });

        it('should read an item address', () => {
            assert.strictEqual(readAddress('iGwEaCH6f').index, 123);
            assert.strictEqual(readAddress('iGwEaCH6f').type, 'item');
        });

        it('should validate the type', () => {
            assert.throws(() => {
                readAddress('g8y7nxSMe');
            });
        });

        it('should validate the checksum', () => {
            assert.throws(() => {
                readAddress('m8y7nxSMf');
            });
        });

    });

});
