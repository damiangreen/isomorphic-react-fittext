# isomorphic-react-fittext

`ReactFitText` is component that allows you to fit text automatically.

It fits boths horizontally and vertically and works in isomorphic applications.

It allows for component resizing and works in React 16+

Ported from https://github.com/gianu/react-fittext

## Install

- `npm install isomorphic-react-fittext` or
- `yarn add isomorphic-react-fittext`

## Use

```JavaScript
import ReactFitText from 'isomorphic-react-fittext';

const MyComponent = () => {

  return <div style={{width:'100%', height:'100%', display: 'flex',  justifyContent: 'center', alignItems:'center'}}>
      <ReactFitText compressor={0.2}>HELLO WORLD</ReactFitText>
  </div>
};
```

### Parameters
There are few options you can send to the component to modify it default behaviour:

- compressor: you can tweak this variable to increase / decrease the font-size. Default is 1.
- minFontSize: the minimum font size (in px) this component should use.
- maxFontSize: the maximum font size (in px) this component should use.
