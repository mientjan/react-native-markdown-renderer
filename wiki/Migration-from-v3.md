# Migration from v3 to v4

## Breaking Changes

### 1. Minimum React 18.0.0 (was 16.2.0)

Update your `react` dependency to at least 18.0.0.

### 2. Minimum React Native 0.73.0 (was 0.50.4)

Update your `react-native` dependency to at least 0.73.0.

### 3. `react-native-fit-image` Removed

The default `image` render rule now uses React Native's built-in `<Image>` component. If you need auto-sizing image behavior, provide a custom `image` render rule:

```tsx
import { Image } from 'react-native';

const rules = {
  image: (node, children, parent, styles) => (
    <Image
      key={node.key}
      style={styles.image}
      source={{ uri: node.attributes.src }}
      resizeMode="contain"
    />
  ),
};
```

### 4. `prop-types` Removed

Runtime prop validation is no longer performed. Use TypeScript for type checking:

```tsx
import type { MarkdownProps } from 'react-native-markdown-renderer';
```

### 5. Class Component Replaced with Function Component

The `<Markdown>` component is now a function component using hooks. Code relying on class instance methods or refs will break.

### 6. `markdown-it` Upgraded from ^8 to ^14

Custom markdown-it plugins should verify compatibility with markdown-it v14.

### 7. Package Entry Points Changed

| Field | v3 | v4 |
|-------|----|----|
| `main` | `index.js` | `lib/commonjs/index.js` |
| `module` | — | `lib/module/index.js` |
| `types` | `index.d.ts` | `lib/typescript/index.d.ts` |

## Code Migration

### Before (v3) — Class Component

```jsx
import react from 'react';
import { PureComponent } from 'react-native';
import Markdown from 'react-native-markdown-renderer';

export default class Page extends PureComponent {
  render() {
    return <Markdown>{copy}</Markdown>;
  }
}
```

### After (v4) — Function Component

```tsx
import Markdown from 'react-native-markdown-renderer';

export default function Page() {
  return <Markdown>{copy}</Markdown>;
}
```

### Custom Rules: `getUniqueID()` → `node.key`

**Before (v3):**

```jsx
import Markdown, { getUniqueID } from 'react-native-markdown-renderer';

const rules = {
  heading1: (node, children, parent, styles) => (
    <Text key={getUniqueID()} style={styles.heading1}>
      {children}
    </Text>
  ),
};
```

**After (v4):**

```tsx
import Markdown from 'react-native-markdown-renderer';
import type { ASTNode, MarkdownStyles } from 'react-native-markdown-renderer';
import type { ReactNode } from 'react';

const rules = {
  heading1: (node: ASTNode, children: ReactNode[], _parent: ASTNode[], styles: MarkdownStyles) => (
    <Text key={node.key} style={[styles.heading as any, styles.heading1 as any]}>
      {children}
    </Text>
  ),
};
```

### Custom Renderer

**Before (v3):**

```jsx
import Markdown, { AstRenderer } from 'react-native-markdown-renderer';
// AstRenderer was imported but not typically used
<Markdown style={styles}>{copy}</Markdown>
```

**After (v4):**

```tsx
import Markdown, { AstRenderer, renderRules, styles as defaultStyles } from 'react-native-markdown-renderer';

const customStyles = { ...defaultStyles, heading1: { fontSize: 32 } };
const renderer = new AstRenderer(renderRules, customStyles);

<Markdown renderer={renderer}>{copy}</Markdown>
```

### 8. Default Styles Overhauled

Default styles were updated to more closely match VS Code's markdown preview. Key changes include:

- **Headings**: added `lineHeight`, `fontWeight: '600'`, and bottom borders on h1/h2
- **Spacing**: added `marginTop`/`marginBottom` to headings, paragraphs, lists, and code blocks
- **Code blocks**: monospace font, updated background colors, rounded corners
- **Blockquote**: left border instead of background color
- **Text**: base font size changed to 16 with lineHeight 24
- **Links**: default color changed to `#0969da`

If your app relies on specific v3 default styles, provide custom styles via the `style` prop to preserve them.

## New in v4

- Full TypeScript source with auto-generated type declarations
- Exported types: `ASTNode`, `RenderFunction`, `RenderRules`, `MarkdownStyles`, `MarkdownProps`
- ESM module output via react-native-builder-bob
- Proper memoization using `useMemo` hooks
- 140 tests across 17 suites

## New in v4.1.0

- **`onLinkPress` prop** — custom link press handler instead of hardcoded `Linking.openURL()`
- **`mergeStyle` prop** (default `true`) — deep-merge custom styles with defaults per key
- **`debugPrintTree` prop** — log AST tree structure to console for debugging
- **`maxTopLevelChildren` + `topLevelMaxExceededItem`** — preview mode to limit rendered children
- **`allowedImageHandlers` + `defaultImageHandler`** — validate image URLs before rendering
- **Image accessibility** — `accessibilityLabel` from image alt text
- **Hardbreak fix** — renders as `<Text>{'\n'}</Text>` instead of `<View>` (fixes Android crash inside Text)
- **Code block fix** — trims trailing newline from `code_block` and `fence` content
- **Ordered list fix** — respects the `start` attribute (e.g. `57. foo` renders as 57)
- **`RenderFunction` type** — extended with `...args: unknown[]` rest parameter for backward-compatible extra arguments
- **`AstRendererOptions` interface** — new configuration object for `AstRenderer` constructor
