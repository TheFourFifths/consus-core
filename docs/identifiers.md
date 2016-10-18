# Identifiers

## Using `createAddress`

```javascript
import { createAddress } from 'consus-core/identifiers';

let index = 0; // Index of the model/item in the Store's array
let type = 'model'; // 'model' or 'item'
createAddress(index, type);
// 'm8y7nEtAe'
```

## Using `readAddress`

```javascript
import { readAddress } from 'consus-core/identifiers';

readAddress('m8y7nEtAe');
// result.index === 0
// result.type === 'model'
```
