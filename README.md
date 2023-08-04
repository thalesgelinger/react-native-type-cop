# react-native-type-cop

The react native typescript police

## Installation

```sh
npm install react-native-type-cop
```

## Usage

on App.tsx
```js
import { Debugger } from 'react-native-type-cop';

// ...

return <>
  <Debugger/>
  ...
</>
```

on top of metro.config.js
```js
require('react-native-type-cop/lib/module/typecop');
// ...
```



## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
