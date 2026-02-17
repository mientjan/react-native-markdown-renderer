# Custom Renderer

The `renderer` prop gives you full control over how the parsed AST is rendered. Use this when you need to customize both rules and styles together, or when you want to completely replace the rendering pipeline.

## AstRenderer

The `AstRenderer` class combines render rules and styles into a single renderer instance.

### Constructor

```tsx
import { AstRenderer, renderRules, styles } from 'react-native-markdown-renderer';

const renderer = new AstRenderer(renderRules, styles);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `renderRules` | `RenderRules` | Object mapping node types to render functions |
| `style` | `MarkdownStyles` (optional) | Styles passed to every render function |

### Example

```tsx
import Markdown, {
  AstRenderer,
  renderRules,
  styles as defaultStyles,
} from 'react-native-markdown-renderer';

const customStyles = {
  ...defaultStyles,
  heading1: {
    fontSize: 32,
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
  heading: {
    fontWeight: '600',
    borderBottomWidth: 1,
    borderColor: '#000000',
  },
};

const renderer = new AstRenderer(renderRules, customStyles);

const App = () => (
  <Markdown renderer={renderer}>
    {'# Custom rendered heading'}
  </Markdown>
);
```

## Function Renderer

You can also pass a function directly. It receives the parsed AST nodes and must return a `ReactElement`:

```tsx
import Markdown from 'react-native-markdown-renderer';
import { Text, View } from 'react-native';
import type { ASTNode } from 'react-native-markdown-renderer';

function myRenderer(nodes: ASTNode[]) {
  return (
    <View>
      {nodes.map((node) => (
        <Text key={node.key}>{node.content || node.type}</Text>
      ))}
    </View>
  );
}

const App = () => (
  <Markdown renderer={myRenderer}>
    {'# Hello'}
  </Markdown>
);
```

## Important Notes

- When `renderer` is set, the `rules` and `style` props are **ignored**. A console warning is emitted if you use them together.
- To combine custom rules and styles, create an `AstRenderer` with both, rather than using separate props.

## Full Example

See [`example/screens/CustomRendererExample.tsx`](https://github.com/mientjan/react-native-markdown-renderer/blob/master/example/screens/CustomRendererExample.tsx) for a working demo.
