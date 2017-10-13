# React Native Markdown Renderer [![npm version](https://badge.fury.io/js/react-native-markdown-renderer.svg)](https://badge.fury.io/js/react-native-markdown-renderer) [![Known Vulnerabilities](https://snyk.io/test/github/mientjan/react-native-markdown-renderer/badge.svg)](https://snyk.io/test/github/mientjan/react-native-markdown-renderer)

Is a 100% compatible CommonMark renderer, a react-native markdown renderer done right. This is __not__
a web-view markdown renderer but a renderer that uses native components for all its elements. These components can be overwritten when needed as seen in the examples.

To give a summary of the supported syntax react-native-markdown-renderer supports.

 - Tables
 - Heading 1 > 6
 - Horizontal Rules
 - Typographic replacements
 - Emphasis ( **bold**, *italic*, ~~strikethrough~~ )
 - Blockquotes
 - Lists
    - Ordered
    57. Unordered
    2. foo
    3. bar
 - Code Blocks
 - Syntax highlighting
 - Links
 - Images
 - Plugins for extra syntax support, [see plugins](https://www.npmjs.com/browse/keyword/markdown-it-plugin). Because this markdown-renderer uses markdown-it as its base it also supports all its plugins and subsequent extra language support.


### tested on:

| [] | react | react-native |
| ---- | ---- | ------- |
| v | 16.0.0-alpha.12 | 0.45.1 |
| v | 16.0.0-alpha.6 | 0.44.0 |
| v | ^15.6.1 | ^0.46.4 |

### todo
 - add styleSheet support
 - add styleSheet inheritance support
 - ~~adding plugin support~~

### How to:

#### npm
```npm
npm install -S react-native-markdown-renderer
```
#### yarn
```npm
yarn add react-native-markdown-renderer
```

### Example:
##### Simple example
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

##### If you want to use your own native elements and styling, and want to add extra plugins:
```js

import react from 'react';
import {View, PureComponent, Text} from 'react-native';
import Markdown, { AstRenderer, defaultRenderFunctions, PluginContainer, blockPlugin} from 'react-native-markdown-renderer';

const copy = `# h1 Heading 8-)

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

[block]
I'm in a block
[/block]
`;

/**
 * i'm overriding the default h1 render function.
 */
const renderer = new AstRenderer({
  ...defaultRenderFunctions,
  h1: (node, children, parents) => {
    return <Text style={{backgroundColor: 'red'}}>{children}</Text>;
  },
  // added custom block element defined by plugin
  block: (node, children, parents) => {
  	return <Text style={{backgroundColor: 'green'}}>{children}</Text>;
  }
});

export default class Page extends PureComponent {

  static propTypes = {};
  static defaultProps = {};

  render() {

  	const plugins = [
  	  new PluginContainer(blockPlugin, 'block', {})
  	];

    return (
    	<Markdown renderer={renderer} plugins={plugins}>{copy}</Markdown>
    );
  }
}
```

---


# Syntax Support

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
