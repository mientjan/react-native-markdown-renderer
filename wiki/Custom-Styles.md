# Custom Styles

The `style` prop lets you override default styles for any markdown element. Your styles are merged with the defaults — you only need to specify what you want to change.

## Usage

```tsx
import Markdown from 'react-native-markdown-renderer';

const customStyles = {
  heading1: {
    fontSize: 32,
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
  heading: {
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
  strong: {
    fontWeight: '800',
  },
};

const App = () => (
  <Markdown style={customStyles}>
    {'# Styled Heading\n\n**Bold text** in a paragraph.'}
  </Markdown>
);
```

## How Merging Works

Custom styles are spread on top of the defaults:

```tsx
// Inside the Markdown component:
new AstRenderer(
  { ...defaultRenderRules, ...rules },
  { ...defaultStyles, ...style }
);
```

This means you can override individual keys without losing the rest.

## Available Style Keys

| Key | Applies To | Default Notes |
|-----|-----------|---------------|
| `root` | Outermost wrapper View | — |
| `view` | Generic View wrapper | — |
| `text` | Base text style | 16px, line-height 24 |
| `heading` | All headings (shared) | font-weight 600 |
| `heading1` | `# Heading` | 32px |
| `heading2` | `## Heading` | 24px |
| `heading3` | `### Heading` | 20px |
| `heading4` | `#### Heading` | 16px |
| `heading5` | `##### Heading` | 14px |
| `heading6` | `###### Heading` | 13.6px, gray color |
| `headingContainer` | View wrapping headings | flex-row, margins |
| `heading1Container` | View wrapping h1 | bottom border |
| `heading2Container` | View wrapping h2 | bottom border |
| `paragraph` | `<p>` paragraphs | margin-bottom 16 |
| `strong` | `**bold**` | font-weight bold |
| `em` | `*italic*` | font-style italic |
| `strikethrough` | `~~text~~` | line-through |
| `del` | Deleted text | line-through |
| `link` | `[text](url)` | blue color |
| `blocklink` | Block-level links | bottom border |
| `blockquote` | `> quote` | left border, padding |
| `codeBlock` | Fenced/indented code | gray bg, monospace |
| `codeInline` | `` `inline` `` | gray bg, monospace |
| `inlineCode` | Inline code (alias) | gray bg, monospace |
| `pre` | Pre-formatted wrapper | margin-bottom 16 |
| `list` | All lists | margin-bottom 16 |
| `listOrdered` | `1. 2. 3.` | — |
| `listUnordered` | `- - -` | — |
| `listItem` | List item content | flex: 1 |
| `listOrderedItem` | Ordered item row | flex-row |
| `listOrderedItemIcon` | Number prefix | margins |
| `listOrderedItemText` | Ordered item text | line-height 24 |
| `listUnorderedItem` | Unordered item row | flex-row |
| `listUnorderedItemIcon` | Bullet prefix | margins |
| `listUnorderedItemText` | Unordered item text | line-height 24 |
| `table` | Table wrapper | border |
| `tableHeader` | `<thead>` | gray bg |
| `tableHeaderCell` | `<th>` | border, bold, padding |
| `tableRow` | `<tr>` | bottom border, flex-row |
| `tableRowCell` | `<td>` | border, padding |
| `hr` | `---` horizontal rule | gray bg, 4px height |
| `hardbreak` | Hard line break | 100% width, 1px height |
| `softbreak` | Soft line break | — |
| `image` | `![alt](src)` | flex: 1 |
| `htmlBlock` | HTML block | margin-bottom 16 |
| `htmlInline` | Inline HTML | — |
| `u` | Underline | underline decoration |

## Full Example

See [`example/screens/CustomStylesExample.tsx`](https://github.com/mientjan/react-native-markdown-renderer/blob/master/example/screens/CustomStylesExample.tsx) for a working demo.
