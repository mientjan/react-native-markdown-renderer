# Plugins

This library uses [markdown-it](https://github.com/markdown-it/markdown-it) as its parser. Any markdown-it plugin can be integrated using the `plugins` prop.

## Usage

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

## PluginContainer

`PluginContainer` wraps a markdown-it plugin and its options:

```tsx
class PluginContainer<T = unknown> {
  constructor(plugin: T, ...options: unknown[]);
}
```

### With Options

Some plugins accept configuration options:

```tsx
const plugins = [
  new PluginContainer(somePlugin, { option1: true, option2: 'value' }),
];
```

### Multiple Plugins

You can use multiple plugins simultaneously:

```tsx
const plugins = [
  new PluginContainer(pluginA),
  new PluginContainer(pluginB, { optionB: true }),
  new PluginContainer(pluginC),
];
```

## Custom markdown-it Instance

For full control over the parser, pass a pre-configured `markdown-it` instance via the `markdownit` prop:

```tsx
import Markdown from 'react-native-markdown-renderer';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, linkify: true })
  .use(somePlugin)
  .use(anotherPlugin, { option: true });

const App = () => (
  <Markdown markdownit={md}>
    {'# Custom parser configuration'}
  </Markdown>
);
```

## Finding Plugins

Browse the [markdown-it plugin ecosystem](https://www.npmjs.com/browse/keyword/markdown-it-plugin) on npm.

Popular plugins include:
- `markdown-it-checkbox` - Checkboxes
- `markdown-it-emoji` - Emoji shortcodes
- `markdown-it-footnote` - Footnotes
- `markdown-it-sub` / `markdown-it-sup` - Subscript / Superscript
- `markdown-it-abbr` - Abbreviations

## Custom Render Rules for Plugins

When a plugin introduces new token types, you'll need to add corresponding render rules:

```tsx
import Markdown, { PluginContainer } from 'react-native-markdown-renderer';
import { Text } from 'react-native';

const plugins = [new PluginContainer(myPlugin)];

const rules = {
  my_custom_token: (node, children, parent, styles) => (
    <Text key={node.key} style={{ color: 'red' }}>
      {children}
    </Text>
  ),
};

const App = () => (
  <Markdown plugins={plugins} rules={rules}>
    {'content with custom syntax'}
  </Markdown>
);
```
