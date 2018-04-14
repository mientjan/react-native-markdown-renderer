# Simple Implementation with custom styles

docs for v3.0.0

So to describe what i customized 
 - Heading1 has a **fontSize** of 32, **backgroundColor** black and a **color** white. 
 - all headers have a **border** at the bottom, of width 1 with a black color.
 

```jsx
import react from 'react';
import {View, PureComponent, Text} from 'react-native';
import Markdown, { AstRenderer } from 'react-native-markdown-renderer';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  heading: {
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  heading1: {
    fontSize: 32,
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  }
});

const copy = `
# h1 Heading 8-)
## h2 Heading 8-)
### h3 Heading 8-)

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
`;

export default class Page extends PureComponent {
  render() {
    return (
    	<Markdown style={styles}>{copy}</Markdown>
    );
  }
}
```