# Basic Implementation

docs for v3.0.0

```js
import react from 'react';
import {PureComponent} from 'react-native';
import Markdown from 'react-native-markdown-renderer';

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

  onLinkPress = (url) => {
    if (url) {
      // some custom logic
    }
    // return true to open with `Linking.openURL
    // return false to handle it yourself
    return true
  }
  testID = "testID"
  render() {
    return (
    	<Markdown onLinkPress={this.onLinkdPress} testID={testID}>{copy}</Markdown>
    );
  }
}
```


 - updating docs Mient-jan Stelling 1/19/18, 13:00
 - updating readme Mient-jan Stelling 1/19/18, 12:59
 - Merge branch 'release/3.0.0' Mient-jan Stelling 1/19/18, 12:55
 - fixed issue where headers would now break to new line. Mient-jan Stelling 1/19/18, 12:54
 - fixed issue where images would not render. Mient-jan Stelling 1/19/18, 12:33
 - fixed issue where you could not set a general fontSize fo all copy. #17 Mient-jan Stelling 1/19/18, 12:06
 - adding small function so example wont break when starting it. Mient-jan Stelling 1/18/18, 18:55
 - updating to 3.0.0 because of breaking changes Mient-jan Stelling 1/18/18, 18:48
 - updating package.json to new react and react-native versions Mient-jan Stelling 1/18/18, 18:47
 - refactoring code so it will be easier to add plugins Mient-jan Stelling 1/18/18, 18:46
 - updating example code base Mient-jan Stelling 1/18/18, 18:39
 - adding watcher, for better development of component Mient-jan Stelling 1/18/18, 18:36
 - converting to new rule names, ul = bullet_list li = ordered_list a = link br = softbreak h1 <> h6 = heading1 <> heading6 Mient-jan Stelling 1/16/18, 14:13
 - adding type convert function for better support of new of writing tags. Mient-jan Stelling 1/16/18, 11:57