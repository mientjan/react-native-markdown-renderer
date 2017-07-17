# (beta) React Native Markdown Renderer

React Native 100% compatible CommonMark renderer, this renderer uses markdown-it as 
its base to tokenise the markdown, after that a ast is generated and given to the AstRenderer.
 
**Project has been tested on:**

| Type | Version |
| ---- | ------- |
| react | 16.0.0-alpha.12 |
| react-native | 0.45.1 |


You can 

#### npm
```npm
npm install -S react-native-markdown-renderer
```
#### yarn
```npm
yarn add react-native-markdown-renderer
```

How to use:
```js

import react from 'react';
import {View, PureComponent} from 'react-native';
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

  render() {

    return (
    	<Markdown>{copy}</Markdown>
    );
  }
}
```

How to use this library with custom renderer:
```js

import react from 'react';
import {View, PureComponent, Text} from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import AstRenderer from 'react-native-markdown-renderer/lib/AstRenderer';
import defaultRendererFunctions from 'react-native-markdown-renderer/lib/defaultRendererFunctions';



const copy = `# h1 Heading 8-)

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
`;

/**
 * i'm overriding the default h1 render function.
 */
const renderer = new AstRenderer(Object.assign({}, defaultRendererFunctions, {
  h1: (node, children) => {
    return <Text style={{backgroundColor: 'red'}}>{children}</Text>;
  },
}));

export default class Page extends PureComponent {

  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
    	<Markdown renderer={renderer}>{copy}</Markdown>
    );
  }
}
```

---


## Syntax Support

__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


### Horizontal Rules

___

---


### Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

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


## Code

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

## Tables

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


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"