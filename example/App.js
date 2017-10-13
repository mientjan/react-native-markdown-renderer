import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Markdown, { AstRenderer, style, defaultRenderFunctions, PluginContainer, blockPlugin } from 'react-native-markdown-renderer';

const markdownText = `
 # Syntax Support

__Advertisement :)__

This is a text. Click [here](https://google.com) to open a link. Let's add some more text to see how this behaves.

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

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
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
1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

57. foo
1. bar


## Code

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
`;

const markdownText2 = ` # Syntax Support

__Advertisement :)__

This is a text. Click [here](https://google.com) to open a link. Let's add some more text to see how this behaves.`;

/**
 * i'm overriding the default h1 render function.
 */
const renderer = new AstRenderer({
	...defaultRenderFunctions,
	h1: (node, children, parents) => {
		return (
            <Text key={AstRenderer.getUniqueID()} style={{ backgroundColor: 'red' }}>{children}</Text>
		);
	},
	// added custom block element defined by plugin
	block: (node, children, parents) => {
		return (
            <Text key={AstRenderer.getUniqueID()} style={{ backgroundColor: 'green' }}>{children}</Text>
		);
	},
});

export default class App extends React.Component {
	render() {
		return (
            <View style={styles.container}>
                <ScrollView>
                    <Text>Markdown</Text>
                    <Text>--------</Text>
                    <Markdown plugins={[]} children={markdownText} />
                </ScrollView>
            </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffcc00',
		paddingTop: 20,
	},
});
