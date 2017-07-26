
const fs = require('fs');
const MarkdownIt = require('markdown-it');

let md = MarkdownIt();

/**
 *
 * @param {{type: string, tag:string, content: string, children: *, attrs: Array}} token
 * @param {number} tokenIndex
 * @return {{type: string, content, tokenIndex: *, index: number, attributes: {}, children: *}}
 */
function createNode(token, tokenIndex) {
	let type = 'root';

	if (token) {
		if (!token.tag) {
			type = token.type;
		} else {
			type = token.tag;
		}
	}

	const content = token.content;
	let attributes = {};

	if (token.attrs) {
		attributes = token.attrs.reduce((prev, curr) => {
			const [name, value] = curr;
			return Object.assign({}, prev, { [name]: value });
		}, {});
	}

	return {
		type,
		content,
		tokenIndex,
		index: 0,
		attributes,
		children: tokensToAST(token.children),
	};
}

/**
 *
 * @param {Array<{type: string, tag:string, content: string, children: *, attrs: Array}>}tokens
 * @return {Array}
 */
function tokensToAST(tokens) {
	const stack = [];
	const stackText = [];
	let children = [];

	if (!tokens || tokens.length === 0) {
		return [];
	}

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		const astNode = createNode(token, i);

		if (!(astNode.type === 'text' && astNode.children.length === 0 && astNode.content === '')) {
			astNode.index = children.length;

			if (token.nesting === 1) {
				children.push(astNode);
				stack.push(children);
				children = astNode.children;
			} else if (token.nesting === -1) {
				children = stack.pop();
			} else if (token.nesting === 0) {
				children.push(astNode);
			}
		}
	}

	return children;
}

function stringToTokens(source, markdownIt = md) {
	let result = [];
	try {
		result = md.parse(source, {});
	} catch (err) {}
	return result;
}

let text = `
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

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"`;

const data = tokensToAST(stringToTokens(text));


fs.writeFileSync('./output.json', JSON.stringify(data));