# Basic Implementation

```jsx
import react from 'react';
import {PureComponent} from 'react-native';
import Markdown from 'react-native-markdown-display';

const copy = `# h1 Heading 8-)

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
`;

export default class Page extends PureComponent {

  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
    	<Markdown>{copy}</Markdown>
    );
  }
}
```

