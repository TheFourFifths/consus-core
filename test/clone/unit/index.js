import { assert } from 'chai';
import clone from '../../../clone';

describe('Clone', () => {

    it('should handle null', () => {
        assert.isNull(clone(null));
    });

    it('should handle undefined', () => {
        assert.isUndefined(clone(undefined));
    });

    it('should handle booleans', () => {
        assert.isFalse(clone(false));
        assert.isTrue(clone(true));
    });

    it('should handle numbers', () => {
        assert.strictEqual(clone(42), 42);
        assert.strictEqual(clone(3.14159265358979), 3.14159265358979);
        assert.strictEqual(clone(0), 0);
        assert.strictEqual(clone(-1.6180339887), -1.6180339887);
        assert.strictEqual(clone(Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY);
        assert.strictEqual(clone(Number.NEGATIVE_INFINITY), Number.NEGATIVE_INFINITY);
    });

    it('should handle strings', () => {
        assert.strictEqual(clone('Hello, World!'), 'Hello, World!');
        assert.strictEqual(clone('abc123'), 'abc123');
        assert.strictEqual(clone('Consus'), 'Consus');
    });

    it('should handle symbols', () => {
        let symbol = Symbol();
        assert.strictEqual(clone(symbol), symbol);
    });

    it('should handle functions', () => {
        function original(x, y) {
            return x + y;
        }
        original.a = 3;
        let twin = clone(original);
        assert.notStrictEqual(twin, original);
        assert.strictEqual(twin.toString(), original.toString());
        assert.strictEqual(twin.name, original.name);
        assert.strictEqual(twin.a, 3);
    });

    it('should handle arrays', () => {
        let original = [
            3,
            10,
            15
        ];
        let twin = clone(original);
        assert.notStrictEqual(twin, original);
        assert.deepEqual(twin, original);
    });

    it('should handle objects', () => {
        let original = {
            a: 3,
            b: 5,
            c: 7
        };
        let twin = clone(original);
        assert.notStrictEqual(twin, original);
        assert.deepEqual(twin, original);
    });

    it('should handle deep arrays', () => {
        let symbol = Symbol();
        let original = [
            null,
            undefined,
            false,
            42,
            'Hello, World!',
            symbol,
            [
                3,
                10,
                [
                    9,
                    1,
                    4
                ]
            ],
            {
                a: 2,
                b: 5,
                c: 7
            }
        ];
        let twin = clone(original);
        assert.notStrictEqual(twin, original);
        assert.notStrictEqual(twin[6], original[6]);
        assert.notStrictEqual(twin[6][2], original[6][2]);
        assert.notStrictEqual(twin[7], original[7]);
        assert.deepEqual(twin, original);
    });

    it('should handle deep objects', () => {
        let symbol = Symbol();
        let original = {
            a: null,
            b: undefined,
            c: false,
            d: 42,
            e: 'Hello, World!',
            f: symbol,
            g: [
                3,
                10,
                [
                    9,
                    1,
                    4
                ]
            ],
            h: {
                a: 2,
                b: 5,
                c: 7
            }
        };
        let twin = clone(original);
        assert.notStrictEqual(twin, original);
        assert.notStrictEqual(twin.g, original.g);
        assert.notStrictEqual(twin.g[2], original.g[2]);
        assert.notStrictEqual(twin.h, original.h);
        assert.deepEqual(twin, original);
    });

});
