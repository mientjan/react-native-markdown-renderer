# Custom Rules

The `rules` prop lets you replace how specific markdown elements are rendered. Each rule is a function that receives the parsed node and returns a React element.

## Usage

```tsx
import React from 'react';
import { Text } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import type { ASTNode, RenderRules, MarkdownStyles } from 'react-native-markdown-renderer';
import type { ReactNode } from 'react';

const rules: Partial<RenderRules> = {
  heading1: (node: ASTNode, children: ReactNode[], _parent: ASTNode[], styles: MarkdownStyles) => (
    <Text key={node.key} style={[styles.heading as any, styles.heading1 as any]}>
      [{children}]
    </Text>
  ),
};

const App = () => (
  <Markdown rules={rules}>
    {'# This heading will be wrapped in brackets'}
  </Markdown>
);
```

## RenderFunction Signature

Every render rule follows this signature:

```tsx
type RenderFunction = (
  node: ASTNode,
  children: ReactNode[],
  parentNodes: ASTNode[],
  styles: MarkdownStyles
) => ReactNode;
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `node` | `ASTNode` | The parsed markdown node |
| `children` | `ReactNode[]` | Already-rendered child elements |
| `parentNodes` | `ASTNode[]` | Ancestor nodes (for context) |
| `styles` | `MarkdownStyles` | The resolved style object |

## ASTNode Type

```tsx
interface ASTNode {
  type: string;           // Rule name (e.g. "heading1", "paragraph")
  sourceType: string;     // Original markdown-it token type
  sourceInfo: string;     // Info string (e.g. language for fenced code)
  sourceMeta: unknown;    // Token meta
  block: boolean;         // Whether it's a block-level element
  markup: string;         // The markup string (e.g. "." for ordered lists)
  key: string;            // Unique key for React rendering
  content: string;        // Text content (for leaf nodes)
  tokenIndex: number;     // Index in token stream
  index: number;          // Index among siblings
  attributes: Record<string, string>;  // HTML attributes (href, src, etc.)
  children: ASTNode[];    // Child nodes
}
```

## Available Rule Names

These are the rule names you can override:

| Rule | Element |
|------|---------|
| `unknown` | Fallback for unrecognized types |
| `textgroup` | Text group wrapper |
| `inline` | Inline content |
| `text` | Plain text |
| `span` | Span element |
| `strong` | **Bold** |
| `s` | ~~Strikethrough~~ |
| `em` | *Italic* |
| `u` | Underline |
| `link` | [Link](url) |
| `blocklink` | Block-level link |
| `image` | ![Image](src) |
| `heading1` - `heading6` | # Headings |
| `paragraph` | Paragraph |
| `hardbreak` | Hard line break |
| `softbreak` | Soft line break |
| `blockquote` | > Blockquote |
| `code_inline` | `` `inline code` `` |
| `code_block` | Indented code block |
| `fence` | Fenced code block |
| `pre` | Pre-formatted wrapper |
| `bullet_list` | Unordered list |
| `ordered_list` | Ordered list |
| `list_item` | List item |
| `table` | Table |
| `thead` | Table header |
| `tbody` | Table body |
| `tr` | Table row |
| `th` | Table header cell |
| `td` | Table data cell |
| `hr` | Horizontal rule |
| `html_block` | HTML block |
| `html_inline` | Inline HTML |

## Key Assignment

Use `node.key` for the React `key` prop. In v3, `getUniqueID()` was used for this purpose — in v4, `node.key` is already set on every node.

## Full Example

See [`example/screens/CustomRulesExample.tsx`](https://github.com/mientjan/react-native-markdown-renderer/blob/master/example/screens/CustomRulesExample.tsx) for a working demo.
