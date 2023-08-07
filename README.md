# react-native-type-cop

The react native typescript police

## Motivation

By using typescript, we notice that in the web we can simply not allowing the build happens when there's some type error, and when we have the error, it is displayed in the browser at that moment, but currently we don't have it in the mobile, so here's where react-native-type-cop cames for, it's a dev tool to help us get the typescript error directly in the emulator/simulator the dev is running, after adding it to the project, it will check for every single typescript error in the project, and display it in the device while you're developing.

## Demo

https://github.com/thalesgelinger/react-native-type-cop/assets/55005400/c96fd878-eed3-48cb-a984-93e479f7e365


## Installation

```sh
npm install react-native-type-cop
```

## Usage

on App.tsx
```js
import { Typecop } from 'react-native-type-cop';

// ...

return <>
  <Typecop/>
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
