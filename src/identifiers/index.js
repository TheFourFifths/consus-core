import crypto from 'crypto';
import bs58 from 'bs58';

const RANGE = 268435456;
const MODEL_OFFSET = RANGE;
const ITEM_OFFSET = 2 * RANGE;

/**
 * Create an address from a type and index
 * @param  {number} index
 * @param  {string} type
 * @return {string}
 */
export function createAddress(index, type) {
    if (index < 0) {
        throw new Error('Index must be at least 0.');
    }
    if (index >= RANGE) {
        throw new Error('Index must be less than 268435456.');
    }
    if (type === 'model') {
        index += MODEL_OFFSET;
    } else if (type === 'item') {
        index += ITEM_OFFSET;
    } else {
        throw new Error('Type must be "model" or "item".');
    }
    let id = new Buffer(4);
    id.writeInt32BE(index, 0);
    let checksum = crypto.createHash('sha256').update(id).digest().slice(0, 2);
    id = Buffer.concat([id, checksum]);
    let address = bs58.encode(id);
    if (type === 'model') {
        return 'm' + address;
    } else if (type === 'item') {
        return 'i' + address;
    } else {
        throw new Error('Something is severely broken.');
    }
}

/**
 * Read the index and type of an address
 * @param  {string} address
 * @return {object}
 */
export function readAddress(address) {
    let type = address.slice(0, 1);
    let result = new Object(null);
    if (type === 'm') {
        result.type = 'model';
    } else if (type === 'i') {
        result.type = 'item';
    } else {
        throw new Error('Unknown type.');
    }
    address = address.slice(1);
    address = new Buffer(bs58.decode(address));
    let checksum = address.slice(4);
    let id = address.slice(0, 4);
    let validationChecksum = crypto.createHash('sha256').update(id).digest().slice(0, 2);
    if (checksum.compare(validationChecksum) !== 0) {
        throw new Error('Invalid checksum.');
    }
    let index = id.readInt32BE(0);
    if (type === 'm') {
        result.index = index - MODEL_OFFSET;
    } else if (type === 'i') {
        result.index = index - ITEM_OFFSET;
    } else {
        throw new Error('Unknown type.');
    }
    return result;
}
