# React Native Markdown Display [![npm version](https://badge.fury.io/js/react-native-markdown-display.svg)](https://badge.fury.io/js/react-native-markdown-display) [![Known Vulnerabilities](https://snyk.io/test/github/iamacup/react-native-markdown-display/badge.svg)](https://snyk.io/test/github/iamacup/react-native-markdown-display)

This is a form of [react-native-markdown-renderer](https://github.com/mientjan/react-native-markdown-renderer) which is not currently maintained.

It a 100% compatible CommonMark renderer, a react-native markdown renderer done right. This is __not__
a web-view markdown renderer but a renderer that uses native components for all its elements. These components can be overwritten when needed as seen in the examples.

### Compatibility with react-native-markdown-renderer

This is intended to be a drop-in replacement for react-native-markdown-renderer, with a variety of bug fixes and enhancements.

### Install

#### npm
```npm
npm install -S react-native-markdown-display
```
#### yarn
```npm
yarn add react-native-markdown-display
```

### Get Started

```js
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
