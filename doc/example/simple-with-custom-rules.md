# Simple Implementation with custom Rules

docs for v3.0.0

So to describe what i customized 
 - header1 will always look like ```[ h1 Heading 8-)]```
 - header2 will always look like ```[ h2 Heading 8-)]```
 - header3 will always look like ```[ h3 Heading 8-)]```
 

```jsx
import react from 'react';
import {View, PureComponent, Text} from 'react-native';
import Markdown, {getUniqueID} from 'react-native-markdown-renderer';

const rules = {
    heading1: (node, children, parent, styles) =>
      <Text key={getUniqueID()} style={[styles.heading, styles.heading1]}>
        [{children}]
      </Text>,
    heading2: (node, children, parent, styles) =>
      <Text key={getUniqueID()} style={[styles.heading, styles.heading2]}>
        [{children}]
      </Text>,
    heading3: (node, children, parent, styles) =>
      <Text key={getUniqueID()} style={[styles.heading, styles.heading3]}>
        [{children}]
      </Text>,
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
    	<Markdown rules={rules}>{copy}</Markdown>
    );
  }
}
```