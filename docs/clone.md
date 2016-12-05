# Clone

## Using `clone`

```javascript
import clone from 'consus-core/clone';

let original = {
    a: [0, 1, 2],
    b: 'Hello, World!',
    c: 3.14159265
};

let twin = clone(original);

twin;
/*
{
    a: [0, 1, 2],
    b: 'Hello, World!',
    c: 3.14159265
}
*/

twin === original;
// false

twin.a === original.a;
// false
```
