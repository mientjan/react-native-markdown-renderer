# React Native Markdown Display [![npm version](https://badge.fury.io/js/react-native-markdown-display.svg)](https://badge.fury.io/js/react-native-markdown-display) [![Known Vulnerabilities](https://snyk.io/test/github/iamacup/react-native-markdown-display/badge.svg)](https://snyk.io/test/github/iamacup/react-native-markdown-display)

It a 100% compatible CommonMark renderer, a react-native markdown renderer done right. This is __not__
a web-view markdown renderer but a renderer that uses native components for all its elements. These components can be overwritten when needed as seen in the examples.

### Compatibility with react-native-markdown-renderer

This is intended to be a drop-in replacement for react-native-markdown-renderer, with a variety of bug fixes and enhancements.

### Install

#### Yarn
```npm
yarn add react-native-markdown-display
```

#### NPM
```npm
npm install -S react-native-markdown-display
```

### Get Started

```jsx
import react from 'react';
import { PureComponent } from 'react-native';
import Markdown from 'react-native-markdown-display';

const copy = `# h1 Heading 8-)

** this is some bold text! **

This is normal text
`;

export default class Page extends PureComponent {
  render() {
    return (
      <Markdown>{copy}</Markdown>
    );
  }
}
```

### Props and Functions

The `<Markdown>` object takes the following common props:

| Property | Required | Description                                                      
| --- | --- | ---
| `children` | `true` | The markdown string to render
| `rules` | `false` | An object of rules that specify how to render each markdown item, [see rules section below](#rules) for full list
| `style` | `false` | An object to override the styling for the various rules, [see style section below](#style) for full list
| `onLinkPress` | `false` | A handler function to change click behaviour, [see handling links section below](#handling-links) for more info

And some additional, more advanced options:

| Property | Required | Description    
| --- | --- | ---
| `renderer` | `false` | Used to specify a custom renderer, you can not use the rules or styles props with a custom renderer.
| `markdownit` | `false` | A custom markdownit instance, if you need one
| `plugins` | `false` | An array of plugins to be applied to the markdownit instance


# Rules

# Style

# Handling Links

Links, by default, will be handled with the `import { Linking } from 'react-native';` import and `Linking.openURL(url);` call.

It is possible to overwrite this behaviour in one of two ways:

<details><summary>onLinkPress Callback</summary>
<p>

```jsx
import react from 'react';
import { PureComponent } from 'react-native';
import Markdown from 'react-native-markdown-display';

const copy = `[This is a link!](https://github.com/iamacup/react-native-markdown-display/)`;

export default class Page extends PureComponent {
  onLinkPress = (url) => {
    if (url) {
      // some custom logic
    }
    
    // return true to open with `Linking.openURL
    // return false to handle it yourself
    return true
  }

  render() {
    return (
      <Markdown onLinkPress={this.onLinkPress}>{copy}</Markdown>
    );
  }
}
```

</p>
</details>

<details><summary>Using a Custom Rule</summary>
<p>

You will need to overwrite one or both of `link` and `blocklink`, the original defenitions can be [found here](https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/renderRules.js)

Something like this with `yourCustomHandlerFunctionOrLogicHere`:

```jsx
import react from 'react';
import {View, PureComponent, Text} from 'react-native';
import Markdown, {getUniqueID} from 'react-native-markdown-display';

const rules = {
  link: (node, children, parent, styles) => {
    return (
      <Text key={node.key} style={styles.link} onPress={() => yourCustomHandlerFunctionOrLogicHere(node.attributes.href) }>
        {children}
      </Text>
    );
  },
};

const copy = `[This is a link!](https://github.com/iamacup/react-native-markdown-display/)`;

export default class Page extends PureComponent {
  render() {
    return (
      <Markdown rules={rules}>{copy}</Markdown>
    );
  }
}
```

</p>
</details>


# Syntax Support

<details><summary>Headings</summary>
<p>

  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading

</p>
</details>


<details><summary>Horizontal Rules</summary>
<p>

  ___

  ---

</p>
</details>


<details><summary>Typographic Replacements</summary>
<p>

  Enable typographer option to see result.

  (c) (C) (r) (R) (tm) (TM) (p) (P) +-

  test.. test... test..... test?..... test!....

  !!!!!! ???? ,,  -- ---

  "Smartypants, double quotes" and 'single quotes'

</p>
</details>


<details><summary>Emphasis</summary>
<p>

  Enable typographer option to see result.

  (c) (C) (r) (R) (tm) (TM) (p) (P) +-

  test.. test... test..... test?..... test!....

  !!!!!! ???? ,,  -- ---

  **This is bold text**

  __This is bold text__

  *This is italic text*

  _This is italic text_

  ~~Strikethrough~~

</p>
</details>


<details><summary>Blockquotes</summary>
<p>

  > Blockquotes can also be nested...
  >> ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.

</p>
</details>


<details><summary>Lists</summary>
<p>
  Unordered

  + Create a list by starting a line with `+`, `-`, or `*`
  + Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
      * Ac tristique libero volutpat at
      + Facilisis in pretium nisl aliquet
      - Nulla volutpat aliquam velit
  + Very easy!

  Ordered

  1. Lorem ipsum dolor sit amet
  2. Consectetur adipiscing elit
  3. Integer molestie lorem at massa


  1. You can use sequential numbers...
  1. ...or keep all the numbers as `1.`

  Start numbering with offset:

  57. foo
  1. bar
</p>
</details>


<details><summary>Code</summary>
<p>
  
  Inline `code`

  Indented code

      // Some comments
      line 1 of code
      line 2 of code
      line 3 of code


  Block code "fences"

  ```
  Sample text here...
  ```

  Syntax highlighting

  ``` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  ```

</p>
</details>


<details><summary>Tables</summary>
<p>

  | Option | Description |
  | ------ | ----------- |
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

  Right aligned columns

  | Option | Description |
  | ------:| -----------:|
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

</p>
</details>

<details><summary>Links</summary>
<p>

  [link text](http://dev.nodeca.com)

  [link with title](http://nodeca.github.io/pica/demo/ "title text!")

  Autoconverted link https://github.com/nodeca/pica (enable linkify to see)

</p>
</details>

<details><summary>Images</summary>
<p>

  ![Minion](https://octodex.github.com/images/minion.png)
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

  Like links, Images also have a footnote style syntax

  ![Alt text][id]

  With a reference later in the document defining the URL location:

  [id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"

</p>
</details>

<details><summary>Plugins and Extensions</summary>
<p>

  Plugins for **extra** syntax support - [see plugins](https://www.npmjs.com/browse/keyword/markdown-it-plugin) for the markdown-it library that this library is built on.

</p>
</details>


### Other Resources

 - [Documentation / Examples](https://github.com/iamacup/react-native-markdown-display/tree/master/doc)
 - [Example App](https://github.com/iamacup/react-native-markdown-display/tree/master/example)

This is a fork of [react-native-markdown-renderer](https://github.com/mientjan/react-native-markdown-renderer), a library that unfortunately has not been updated for some time so i took all of the outstanding pull requests from that library and tested + merged as necessary.
