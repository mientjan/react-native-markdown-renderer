# API Reference

## `<Markdown>` Component

The default export. A function component that renders markdown as native React Native elements.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `string \| string[]` | *required* | Markdown content to render |
| `rules` | `Partial<RenderRules>` | `{}` | Custom render rules merged with defaults |
| `style` | `Partial<MarkdownStyles>` | `{}` | Custom styles (deep-merged with defaults by default) |
| `mergeStyle` | `boolean` | `true` | Deep-merge custom styles with defaults per key. Set `false` for shallow replace |
| `renderer` | `AstRenderer \| ((nodes: ASTNode[]) => ReactElement)` | — | Fully custom renderer (overrides `rules` and `style`) |
| `markdownit` | `MarkdownIt` | `MarkdownIt({ typographer: true })` | Custom markdown-it instance |
| `plugins` | `PluginContainer[]` | `[]` | markdown-it plugins |
| `onLinkPress` | `(url: string) => boolean \| void` | — | Custom link press handler. Falls back to `Linking.openURL()` |
| `debugPrintTree` | `boolean` | `false` | Log the AST tree structure to the console |
| `maxTopLevelChildren` | `number \| null` | `null` | Limit rendered top-level children (preview mode) |
| `topLevelMaxExceededItem` | `ReactNode` | `<Text>...</Text>` | Shown when `maxTopLevelChildren` is exceeded |
| `allowedImageHandlers` | `string[]` | `['data:image/png;base64', ..., 'https://', 'http://']` | Allowed image URL prefixes |
| `defaultImageHandler` | `string \| null` | `'http://'` | Prepended to images with unrecognized schemes. `null` to skip |

## Named Exports

### Classes

#### `AstRenderer`

```tsx
class AstRenderer {
  constructor(renderRules: RenderRules, style?: MarkdownStyles, options?: AstRendererOptions);
  getRenderFunction(type: string): RenderFunction;
  renderNode(node: ASTNode, parentNodes: ASTNode[]): ReactNode;
  render(nodes: ASTNode[]): ReactElement;
}
```

Combines render rules, styles, and options into a renderer. The optional `options` parameter configures link handling, image validation, debug logging, and preview mode. See [Custom Renderer](Custom-Renderer).

#### `PluginContainer`

```tsx
class PluginContainer<T = unknown> {
  constructor(plugin: T, ...options: unknown[]);
  toArray(): [T, ...unknown[]];
}
```

Wraps a markdown-it plugin and its options. See [Plugins](Plugins).

### Objects

#### `renderRules`

```tsx
const renderRules: RenderRules;
```

The default render rules object. Contains render functions for all supported node types. Useful as a base when creating a custom `AstRenderer`.

#### `styles`

```tsx
const styles: MarkdownStyles;
```

The default styles object. See [Custom Styles](Custom-Styles) for all available keys.

### Functions

#### `parser`

```tsx
function parser(
  source: string,
  renderer: (nodes: ASTNode[]) => ReactElement,
  markdownIt: MarkdownIt
): ReactElement;
```

Low-level parser function. Tokenizes the source string and passes the AST to the renderer.

#### `stringToTokens`

```tsx
function stringToTokens(source: string, markdownIt: MarkdownIt): Token[];
```

Converts a markdown string to markdown-it tokens.

#### `tokensToAST`

```tsx
function tokensToAST(tokens: Token[]): ASTNode[];
```

Converts markdown-it tokens to the library's AST format.

#### `getUniqueID`

```tsx
function getUniqueID(): string;
```

Generates a unique string ID. Used internally for React keys.

#### `hasParents`

```tsx
function hasParents(parents: ASTNode[], type: string): boolean;
```

Checks if any ancestor node matches the given type. Useful in custom render rules to vary output based on context (e.g., rendering list items differently in ordered vs unordered lists).

#### `applyStyle`

```tsx
function applyStyle(
  children: ReactElement[],
  styles: unknown[],
  targetType: string
): ReactElement[];
```

Applies styles to child elements matching the given component type.

#### `openUrl`

```tsx
function openUrl(url: string): void;
```

Opens a URL using React Native's `Linking` API. Used by the default `link` render rule.

#### `blockPlugin`

```tsx
function blockPlugin(md: MarkdownIt): void;
```

Internal markdown-it plugin for block-level token handling.

### Re-exports

#### `MarkdownIt`

The `markdown-it` constructor, re-exported for convenience:

```tsx
import { MarkdownIt } from 'react-native-markdown-renderer';

const md = new MarkdownIt({ typographer: true });
```

## Type Exports

### `ASTNode`

```tsx
interface ASTNode {
  type: string;
  sourceType: string;
  sourceInfo: string;
  sourceMeta: unknown;
  block: boolean;
  markup: string;
  key: string;
  content: string;
  tokenIndex: number;
  index: number;
  attributes: Record<string, string>;
  children: ASTNode[];
}
```

### `RenderFunction`

```tsx
type RenderFunction = (
  node: ASTNode,
  children: ReactNode[],
  parentNodes: ASTNode[],
  styles: MarkdownStyles,
  ...args: unknown[]
) => ReactNode;
```

The `...args` rest parameter allows built-in rules to receive extra arguments (e.g., `onLinkPress` for links, image handler config for images) without breaking custom rules that only use the first four parameters.

### `RenderRules`

```tsx
interface RenderRules {
  [name: string]: RenderFunction;
}
```

### `MarkdownStyles`

```tsx
type MarkdownStyles = Record<string, unknown>;
```

### `AstRendererOptions`

```tsx
interface AstRendererOptions {
  onLinkPress?: (url: string) => boolean | void;
  debugPrintTree?: boolean;
  maxTopLevelChildren?: number | null;
  topLevelMaxExceededItem?: ReactNode;
  allowedImageHandlers?: string[];
  defaultImageHandler?: string | null;
}
```

Configuration object for `AstRenderer`. See [Custom Renderer](Custom-Renderer) for usage.

### `MarkdownProps`

```tsx
interface MarkdownProps {
  children: string | string[];
  rules?: RenderRules;
  style?: Partial<MarkdownStyles>;
  mergeStyle?: boolean;
  renderer?: AstRenderer | ((nodes: ASTNode[]) => ReactElement);
  markdownit?: MarkdownIt;
  plugins?: PluginContainer[];
  onLinkPress?: (url: string) => boolean | void;
  debugPrintTree?: boolean;
  maxTopLevelChildren?: number | null;
  topLevelMaxExceededItem?: ReactNode;
  allowedImageHandlers?: string[];
  defaultImageHandler?: string | null;
}
```
