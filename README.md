# rn-toastify

A simple and fully customizable, cross platform toast library !

## Installation

```sh
npm install rn-toastify
    or
yarn add rn-toastify
```

If you want to use Icons in Toast, addiditionally, you need to add `react-native-svg` 
Or If you have already installed it, you can set your own Icon in Toast Config

## Usage

```js
import { Toast, ToastProvider, useToast } from 'rn-toastify';

// ...

//Wrap your Top Level App.{js,jsx,ts,tsx} with ToastProvider

const App = () => {
  return (
    <ToastProvider>
      <Toast />
      //Rest of Your Code....
    </ToastProvider>
  );
};

//Start using Toast by using `useToast` hook

const toast = useToast();

toast.success('Hooray,Toast is being displayed :)');
```

## Toast Config

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
