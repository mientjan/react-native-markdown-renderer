# React Native Markdown Renderer

A 100% CommonMark-compatible markdown renderer for React Native using native components (not WebView). All elements are rendered as native React Native components that can be overwritten when needed.

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

## Custom Styles

```tsx
import Markdown from 'react-native-markdown-renderer';

const customStyles = {
  heading1: { fontSize: 40, color: '#333' },
  strong: { fontWeight: '800' },
  paragraph: { marginVertical: 8 },
};

const App = () => (
  <Markdown style={customStyles}>
    {'# Styled Heading\n\n**Bold text** in a paragraph.'}
  </Markdown>
);
```

## Custom Render Rules

```tsx
import React from 'react';
import { Text, View } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import type { ASTNode, RenderRules } from 'react-native-markdown-renderer';

const customRules: Partial<RenderRules> = {
  heading1: (node: ASTNode, children, parent, styles) => (
    <View key={node.key} style={{ backgroundColor: '#eee', padding: 10 }}>
      <Text style={{ fontSize: 28 }}>{children}</Text>
    </View>
  ),
};

const App = () => (
  <Markdown rules={customRules}>
    {'# Custom Heading'}
  </Markdown>
);
```

## Plugins

This library uses [markdown-it](https://github.com/markdown-it/markdown-it) as its parser. Any markdown-it plugin can be used:

```tsx
import Markdown, { PluginContainer } from 'react-native-markdown-renderer';
import markdownItCheckbox from 'markdown-it-checkbox';

const plugins = [new PluginContainer(markdownItCheckbox)];

const App = () => (
  <Markdown plugins={plugins}>
    {'- [ ] Unchecked\n- [x] Checked'}
  </Markdown>
);
```

## Props

| Prop         | Type                                      | Description                              |
| ------------ | ----------------------------------------- | ---------------------------------------- |
| `children`   | `string \| string[]`                      | Markdown content to render (required)    |
| `rules`      | `RenderRules`                             | Custom render rules for element types    |
| `style`      | `Partial<MarkdownStyles>`                 | Custom styles merged with defaults       |
| `renderer`   | `AstRenderer \| ((nodes) => ReactElement)` | Fully custom renderer (overrides rules/style) |
| `markdownit` | `MarkdownIt`                              | Custom markdown-it instance              |
| `plugins`    | `PluginContainer[]`                       | markdown-it plugins                      |

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

## Migration from v3 to v4

### Breaking Changes

1. **Minimum React 18.0.0** (was 16.2.0)
2. **Minimum React Native 0.73.0** (was 0.50.4)
3. **`react-native-fit-image` removed** - The default `image` render rule now uses React Native's built-in `<Image>`. If you need auto-sizing, provide a custom `image` render rule.
4. **`prop-types` removed** - Use TypeScript for type checking.
5. **Class component replaced with function component** - The `<Markdown>` component is now a function component. Any code relying on class refs will break.
6. **`markdown-it` upgraded from ^8 to ^14** - Custom markdown-it plugins should verify compatibility.
7. **Package entry points changed** - `main` points to `lib/commonjs/`, `module` to `lib/module/`, `types` to `lib/typescript/`.

## License

MIT
