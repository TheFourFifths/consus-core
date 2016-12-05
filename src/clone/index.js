const PRIMITIVE_TYPES = [
    'undefined',
    'boolean',
    'number',
    'string',
    'symbol'
];

export default function clone(original) {
    // Check for immutable primitives
    if (original === null || PRIMITIVE_TYPES.indexOf(typeof original) > -1) {
        return original;
    }
    // Handle mutable types
    switch (typeof original) {
    case 'object':
        return cloneObject(original);
    case 'function':
        return cloneFunction(original);
    default:
        throw new Error(`Unkown type:  ${typeof original}`);
    }
}

function cloneObject(original) {
    // Check for arrays
    if (Array.isArray(original)) {
        return cloneArray(original);
    }
    // Create a completely empty object
    let twin = Object.create(null);
    // Clone all attributes
    Object.keys(original).forEach(key => twin[key] = clone(original[key]));
    return twin;
}

function cloneArray(original) {
    // Create an empty array
    let twin = [];
    // Clone all elements/attributes
    Object.keys(original).forEach(key => twin[key] = clone(original[key]));
    return twin;
}

function cloneFunction(original) {
    // Convert the base function to a string, and create a new function from this
    let twin = new Function(`return ${original.toString()};`)();
    // Clone all attributes
    Object.keys(original).forEach(key => twin[key] = clone(original[key]));
    return twin;
}
