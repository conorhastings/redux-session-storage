# Redux Session Storage

A redux middleware for storing redux actions in sessionStorage

### Args
* key - key to store JSON array of actions as in sessionStorage
* transform - a function to transform action before storing *Note* : I reccomend using `Object.assign` or something similar before doing any modifcation to the data as this could adverse effects on your application. the data returned here will not be the action that is passed to next, the action that comes in will be passed, but as this is a plain object and not immutable, modifcations will have side effects.
* limit - a limit on the number of items to store, defaults to no limit

### Use

```js
import reduxSessionStorage from "redux-session-storage";
const sesionStorageRecord = reduxSessionStorage({key: "myKey"});
const createStoreWithMiddleware = applyMiddleware(sessionStorageRecord)(createStore);
```

### Other Functions

We also include a function `getActions(key)` that will return an array of stored actions.


### Install
``` npm i redux-session-storage --save ```

