# React Native Markdown Renderer

[![npm version](https://img.shields.io/npm/v/react-native-markdown-renderer.svg)](https://www.npmjs.com/package/react-native-markdown-renderer)
[![npm downloads](https://img.shields.io/npm/dm/react-native-markdown-renderer.svg)](https://www.npmjs.com/package/react-native-markdown-renderer)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mientjan/react-native-markdown-renderer/blob/master/LICENSE)

A 100% CommonMark-compatible markdown renderer for React Native using native components (not WebView). All elements are rendered as native React Native components that can be overwritten when needed.

**npm:** [react-native-markdown-renderer](https://www.npmjs.com/package/react-native-markdown-renderer) | **GitHub:** [mientjan/react-native-markdown-renderer](https://github.com/mientjan/react-native-markdown-renderer) | **Changelog:** [CHANGELOG.md](CHANGELOG.md)

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

## Examples

The [`example/`](example/) directory contains an Expo app with multiple screens demonstrating key features:

| Screen | Description | Source |
|--------|-------------|--------|
| Basic Markdown | Default rendering | [`BasicExample.tsx`](example/screens/BasicExample.tsx) |
| From .md File | Load markdown from a file asset | [`MarkdownFileExample.tsx`](example/screens/MarkdownFileExample.tsx) |
| Custom Styles | Override default styles | [`CustomStylesExample.tsx`](example/screens/CustomStylesExample.tsx) |
| Custom Rules | Replace render rules | [`CustomRulesExample.tsx`](example/screens/CustomRulesExample.tsx) |
| Custom Renderer | Provide a custom AstRenderer | [`CustomRendererExample.tsx`](example/screens/CustomRendererExample.tsx) |

To run the example app:

```sh
cd example
npm install
npx expo start
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

By default, custom styles are **deep-merged** with the built-in defaults — so you only need to specify properties you want to override. Set `mergeStyle={false}` to replace entire style objects instead.

```tsx
import Markdown from 'react-native-markdown-renderer';

const customStyles = {
  heading1: { fontSize: 40, color: '#333' },  // keeps default fontWeight, lineHeight, etc.
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

## Handling Links

By default, links open via `Linking.openURL()`. Use the `onLinkPress` prop to customize:

```tsx
const App = () => (
  <Markdown onLinkPress={(url) => {
    console.log('Link pressed:', url);
    // return nothing to prevent default behavior
  }}>
    {'[Visit Example](https://example.com)'}
  </Markdown>
);
```

## Image Validation

Control which image URL schemes are allowed. Images with unrecognized schemes get the `defaultImageHandler` prepended, or are skipped entirely when set to `null`:

```tsx
<Markdown
  allowedImageHandlers={['https://', 'data:image/png;base64']}
  defaultImageHandler={null}  // skip images that don't match
>
  {'![photo](https://example.com/photo.png)'}
</Markdown>
```

## Preview Mode

Limit how many top-level elements render — useful for content previews:

```tsx
import { Text } from 'react-native';

<Markdown
  maxTopLevelChildren={3}
  topLevelMaxExceededItem={<Text key="more">Read more...</Text>}
>
  {longMarkdownContent}
</Markdown>
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `children` | `string \| string[]` | — | Markdown content to render (required) |
| `rules` | `RenderRules` | — | Custom render rules for element types |
| `style` | `Partial<MarkdownStyles>` | — | Custom styles (merged with defaults by default) |
| `mergeStyle` | `boolean` | `true` | Deep-merge custom styles with defaults per key. Set `false` for shallow replace |
| `onLinkPress` | `(url: string) => boolean \| void` | — | Custom link press handler. Falls back to `Linking.openURL()` |
| `renderer` | `AstRenderer \| ((nodes) => ReactElement)` | — | Fully custom renderer (overrides rules/style) |
| `markdownit` | `MarkdownIt` | `MarkdownIt({ typographer: true })` | Custom markdown-it instance |
| `plugins` | `PluginContainer[]` | `[]` | markdown-it plugins |
| `debugPrintTree` | `boolean` | `false` | Log the AST tree structure to the console |
| `maxTopLevelChildren` | `number \| null` | `null` | Limit rendered top-level children (preview mode) |
| `topLevelMaxExceededItem` | `ReactNode` | `<Text>...</Text>` | Shown when `maxTopLevelChildren` is exceeded |
| `allowedImageHandlers` | `string[]` | `['data:image/png;base64', ..., 'https://', 'http://']` | Allowed image URL prefixes |
| `defaultImageHandler` | `string \| null` | `'http://'` | Prepended to images with unrecognized schemes. `null` to skip |

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

## Documentation

For comprehensive documentation, visit the [Wiki](https://github.com/mientjan/react-native-markdown-renderer/wiki):

- [Getting Started](https://github.com/mientjan/react-native-markdown-renderer/wiki/Getting-Started)
- [Custom Styles](https://github.com/mientjan/react-native-markdown-renderer/wiki/Custom-Styles)
- [Custom Rules](https://github.com/mientjan/react-native-markdown-renderer/wiki/Custom-Rules)
- [Custom Renderer](https://github.com/mientjan/react-native-markdown-renderer/wiki/Custom-Renderer)
- [Plugins](https://github.com/mientjan/react-native-markdown-renderer/wiki/Plugins)
- [API Reference](https://github.com/mientjan/react-native-markdown-renderer/wiki/API-Reference)
- [Migration from v3](https://github.com/mientjan/react-native-markdown-renderer/wiki/Migration-from-v3)

## What's New in v4.1.0

- **`onLinkPress` prop** — custom link press handler instead of hardcoded `Linking.openURL()`
- **`mergeStyle` prop** (default `true`) — deep-merge custom styles with defaults per key
- **`debugPrintTree` prop** — log AST tree structure to console for debugging
- **`maxTopLevelChildren` + `topLevelMaxExceededItem`** — preview mode to limit rendered children
- **`allowedImageHandlers` + `defaultImageHandler`** — validate image URLs before rendering
- **Image accessibility** — `accessibilityLabel` from image alt text
- **Hardbreak fix** — renders as `<Text>{'\n'}</Text>` instead of `<View>` (fixes Android crash inside Text)
- **Code block fix** — trims trailing newline from `code_block` and `fence` content
- **Ordered list fix** — respects the `start` attribute (e.g. `57. foo` renders as 57)

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
