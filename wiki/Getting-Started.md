# Getting Started

## Installation

```sh
npm install react-native-markdown-renderer
```

or

```sh
yarn add react-native-markdown-renderer
```

## Requirements

| Dependency   | Version    |
| ------------ | ---------- |
| React        | >= 18.0.0  |
| React Native | >= 0.73.0  |

## Basic Usage

```tsx
import React from 'react';
import Markdown from 'react-native-markdown-renderer';

const App = () => (
  <Markdown>
    {`# Hello World

This is **bold** and *italic* text.

- Item 1
- Item 2
`}
  </Markdown>
);
```

## TypeScript Support

This library is written in TypeScript and ships with full type definitions.

```tsx
import Markdown, {
  AstRenderer,
  renderRules,
  styles,
  PluginContainer,
  type MarkdownProps,
  type RenderRules,
  type ASTNode,
  type RenderFunction,
  type MarkdownStyles,
} from 'react-native-markdown-renderer';
```

## Syntax Support

- Headings (1-6)
- Emphasis (**bold**, *italic*, ~~strikethrough~~)
- Blockquotes
- Lists (ordered and unordered)
- Code (inline and blocks)
- Tables
- Links
- Images
- Horizontal rules
- Typographic replacements
- Plugins for extra syntax support via [markdown-it plugins](https://www.npmjs.com/browse/keyword/markdown-it-plugin)

## Next Steps

- [Custom Styles](Custom-Styles) - Override heading sizes, colors, and more
- [Custom Rules](Custom-Rules) - Replace how specific elements render
- [Plugins](Plugins) - Add syntax extensions like checkboxes
