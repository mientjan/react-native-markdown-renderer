# React Native Markdown Display [![npm version](https://badge.fury.io/js/react-native-markdown-display.svg)](https://badge.fury.io/js/react-native-markdown-display) [![Known Vulnerabilities](https://snyk.io/test/github/iamacup/react-native-markdown-display/badge.svg)](https://snyk.io/test/github/iamacup/react-native-markdown-display)

It a 100% compatible CommonMark renderer, a react-native markdown renderer done right. This is __not__
a web-view markdown renderer but a renderer that uses native components for all its elements. These components can be overwritten when needed as seen in the examples.

### Compatibility with react-native-markdown-renderer

This is intended to be a drop-in replacement for react-native-markdown-renderer, with a variety of bug fixes and enhancements - **Due to how the new style rules work, there may be some tweaking needed**, [see how to style stuff section below](#How-to-style-stuff)

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

**This is some bold text!**

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

### How to style stuff

Text styles are applied in a way that makes it much more convenient to manage changes to global styles while also allowing fine tuning of individual elements.

Think of the implementation like applying styles in CSS. changes to the `root` effect everything, but can be overwritten further down the style / component tree.

**Be careful when styling 'text':** the text rule is not applied to all rendered text, most notably list bullet points. If you want to, for instance, color all text, change the `root` style.


<details><summary>Example</summary>
<p>

<img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/style-example.png"/> 

```jsx
const copy = `
This is some text which is red because of the root style, which is also really small!

\`\`\`
//This is a code block woooo

const cool = () => {
  console.log('????');
};
\`\`\`

and some more small text

# This is a h1
## this is a h2
### this is a h3
`;

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaView>
        <View style={{marginHorizontal: 20}}>
          <Markdown
            mergeStyle={true} 
            style={{
              root: {color: 'red', fontSize: 10},
              heading1: {color: 'purple'},
              codeBlock: {color: 'black', fontSize: 14}
            }}
          >
            {copy}
          </Markdown>
        </View>
      </SafeAreaView>
    </>
  );
};
```

</p>
</details>


### Props and Functions

The `<Markdown>` object takes the following common props:

| Property | Required | Description                                                      
| --- | --- | ---
| `children` | `true` | The markdown string to render
| `style` | `false` | An object to override the styling for the various rules, [see style section below](#style) for full list
| `mergeStyle` | `false` | if true, when a style is supplied, the individual items are merged with the default styles instead of overwriting them
| `rules` | `false` | An object of rules that specify how to render each markdown item, [see rules section below](#rules) for full list
| `onLinkPress` | `false` | A handler function to change click behaviour, [see handling links section below](#handling-links) for more info
| `debugPrintTree` | `false` | Will print the AST tree to the console to help you see what the markdown is being translated to


And some additional, less used options:

| Property | Required | Description    
| --- | --- | ---
| `renderer` | `false` | Used to specify a custom renderer, you can not use the rules or styles props with a custom renderer.
| `markdownit` | `false` | A custom markdownit instance with your configuration, default is `MarkdownIt({typographer: true})`
| `plugins` | `false` | An array of plugins to be applied to the markdownit instance
| `maxTopLevelChildren` | `false` | Defaults to null, if defined as a number will only render out first `n` many top level children, then will try to render out `topLevelMaxExceededItem`
| `topLevelMaxExceededItem` | `false` | Defaults to `<Text>...</Text>` - will render when `maxTopLevelChildren` is hit. Make sure to give it a key!
| `allowedImageHandlers` | `false` | Defaults to `['data:image/png;base64', 'data:image/gif;base64', 'data:image/jpeg;base64', 'https://', 'http://']` - Any image that does not start with one of these will have the `defaultImageHandler` value prepended to it (unless `defaultImageHandler` is null in which case it won't try to render anything)
| `defaultImageHandler` | `false` | Defaults to `http://` - will be prepended to an image url if it does not start with something in the `allowedImageHandlers` array, if this is set to null, it won't try to recover but will just not render anything instead.


# Syntax Support

<details><summary>Headings</summary>
<p>

```
  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-1.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-1.png"/>  

</p>
</details>


<details><summary>Horizontal Rules</summary>
<p>

```
  Some text above
  ___

  Some text in the middle

  ---

  Some text below
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-2.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-2.png"/>  


</p>
</details>


<details><summary>Typographic Replacements</summary>
<p>

```
  Enable typographer option to see result.

  (c) (C) (r) (R) (tm) (TM) (p) (P) +-

  test.. test... test..... test?..... test!....

  !!!!!! ???? ,,  -- ---

  "Smartypants, double quotes" and 'single quotes'
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-3.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-3.png"/>  

</p>
</details>


<details><summary>Emphasis</summary>
<p>

```
  **This is bold text**

  __This is bold text__

  *This is italic text*

  _This is italic text_

  ~~Strikethrough~~
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-4.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-4.png"/>  

</p>
</details>


<details><summary>Blockquotes</summary>
<p>

```
  > Blockquotes can also be nested...
  >> ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-5.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-5.png"/>  

</p>
</details>


<details><summary>Lists</summary>
<p>

```
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
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-6.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-6.png"/>  

</p>
</details>


<details><summary>Code</summary>
<p>
  
```
  Inline \`code\`

  Indented code

      // Some comments
      line 1 of code
      line 2 of code
      line 3 of code


  Block code "fences"

  \`\`\`
  Sample text here...
  \`\`\`

  Syntax highlighting

  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-7.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-7.png"/>  

</p>
</details>


<details><summary>Tables</summary>
<p>

```
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
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-8.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-8.png"/>  

</p>
</details>

<details><summary>Links</summary>
<p>

```
  [link text](https://www.google.com)

  [link with title](https://www.google.com "title text!")

  Autoconverted link https://www.google.com (enable linkify to see)
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-9.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-9.png"/>  

</p>
</details>

<details><summary>Images</summary>
<p>

```
  ![Minion](https://octodex.github.com/images/minion.png)
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

  Like links, Images also have a footnote style syntax

  ![Alt text][id]

  With a reference later in the document defining the URL location:

  [id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
```

| iOS | Android
| --- | ---
| <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/ios-10.png"/>  | <img src="https://github.com/iamacup/react-native-markdown-display/raw/master/doc/images/android-10.png"/>  

</p>
</details>

<details><summary>Plugins and Extensions</summary>
<p>

  Plugins for **extra** syntax support - [see plugins](https://www.npmjs.com/browse/keyword/markdown-it-plugin) for the markdown-it library that this library is built on.

</p>
</details>


<details><summary>All Markdown for Testing</summary>
<p>

This is all of the markdown in one place for testing that your applied styles work in all cases

```
Headings

  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading


Horizontal Rules

  Some text above
  ___

  Some text in the middle

  ---

  Some text below


Typographic Replacements

  Enable typographer option to see result.

  (c) (C) (r) (R) (tm) (TM) (p) (P) +-

  test.. test... test..... test?..... test!....

  !!!!!! ???? ,,  -- ---

  "Smartypants, double quotes" and 'single quotes'


Emphasis

  **This is bold text**

  __This is bold text__

  *This is italic text*

  _This is italic text_

  ~~Strikethrough~~


Blockquotes

  > Blockquotes can also be nested...
  >> ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.


Lists

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


Code

  Inline \`code\`

  Indented code

      // Some comments
      line 1 of code
      line 2 of code
      line 3 of code


  Block code "fences"

  \`\`\`
  Sample text here...
  \`\`\`

  Syntax highlighting

  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`


Tables

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


Links

  [link text](https://www.google.com)

  [link with title](https://www.google.com "title text!")

  Autoconverted link https://www.google.com (enable linkify to see)


Images

  ![Minion](https://octodex.github.com/images/minion.png)
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

  Like links, Images also have a footnote style syntax

  ![Alt text][id]

  With a reference later in the document defining the URL location:

  [id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"
```

</p>
</details>


# Rules

Rules are used to specify how you want certain elements to be displayed. The existing implementation is [here](https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/renderRules.js)

The list of rules that can be overwritten is:

```["root" "unknown", "textgroup", "inline", "text", "span", "strong", "s", "link", "blocklink", "em", "heading1", "heading2", "heading3", "heading4", "heading5", "heading6", "paragraph", "hardbreak", "blockquote", "code_inline", "code_block", "fence", "pre", "bullet_list", "ordered_list", "list_item", "table", "thead", "tbody", "th", "tr", "td", "hr", "softbreak", "image"]```

<details><summary>Example Implementation</summary>
<p>

```jsx
import react from 'react';
import {View, PureComponent, Text} from 'react-native';
import Markdown, {getUniqueID} from 'react-native-markdown-display';

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
};

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

</p>
</details>


# Style

Styles are used to override how certain rules are styled. The existing implementation is [here](https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/styles.js)

The list of styles that can be overwritten is:

```["root", "codeBlock", "codeInline", "em", "headingContainer", "heading", "heading1", "heading2", "heading3", "heading4", "heading5", "heading6", "hr", "blockquote", "list", "listItem", "listUnordered", "listUnorderedItem", "listUnorderedItemIcon", "listOrdered", "listOrderedItem", "listOrderedItemIcon", "paragraph", "hardbreak", "strong", "table", "tableHeader", "tableHeaderCell", "tableRow", "tableRowCell", "text", "textGroup", "strikethrough", "link", "blocklink", "image"]```

**NOTE:** If you specify a style property, it will completely overwrite existing styles for that property **UNLESS** you specify `mergeStyle` as true, in which case a merge will take place.

<details><summary>Example Implementation</summary>
<p>

```jsx
import react from 'react';
import {View, PureComponent, Text} from 'react-native';
import Markdown from 'react-native-markdown-display';
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

</p>
</details>


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


# Disabling Specific Types of Markdown

You can dissable any type of markdown you want, which is very useful in a mobile environment, by passing the markdownit property like below. Note that for convenience we also export the `MarkdownIt` instance so you don't have to include it as a project dependency directly just to remove some types of markdown.

This example will stop images and links.

```jsx
import Markdown from 'react-native-markdown-display';
import MarkdownIt from 'react-native-markdown-display/src/MarkdownIt';

const copy = `
# This heading will show with formatting

[but this link will just](be displayed as this text)
`;

<Markdown
  markdownit={
    MarkdownIt({typographer: true}).disable([ 'link', 'image' ])
  }
>
  {copy}
</Markdown>

```

A full list of things you can turn off is [here](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js)



### TODO

- [ ] Code highlighting
- [ ] Provide options for customising image display (fit image)
- [x] Rework styles and rules - the way it is all applied works but is annoying to, for instance, change the text color of everything.


### Other Resources

 - [Documentation / Examples](https://github.com/iamacup/react-native-markdown-display/tree/master/doc)
 - [Example App](https://github.com/iamacup/react-native-markdown-display/tree/master/example)

This is a fork of [react-native-markdown-renderer](https://github.com/mientjan/react-native-markdown-renderer), a library that unfortunately has not been updated for some time so i took all of the outstanding pull requests from that library and tested + merged as necessary.
