import React from 'react';
import { create } from 'react-test-renderer';
import Markdown from '../index';
import type { ASTNode } from '../types';
import { View, Text } from 'react-native';

const comprehensiveMarkdown = `# Heading 1

## Heading 2

### Heading 3

This is a **bold** and *italic* and ~~strikethrough~~ paragraph.

[A link](https://example.com)

![An image](https://example.com/image.png)

- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2

\`inline code\`

\`\`\`
code block
\`\`\`

> Blockquote text

| Header A | Header B |
|----------|----------|
| Cell 1   | Cell 2   |

---

Hard line break follows
next line
`;

describe('Integration', () => {
  it('renders a comprehensive markdown document (snapshot)', () => {
    const tree = create(<Markdown>{comprehensiveMarkdown}</Markdown>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with custom styles applied', () => {
    const customStyle = {
      heading1: { fontSize: 48, color: 'red' },
      strong: { color: 'blue' },
    };
    const tree = create(<Markdown style={customStyle}>{comprehensiveMarkdown}</Markdown>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders with a custom render rule override', () => {
    const customRules = {
      heading1: (node: ASTNode) => (
        <View key={node.key} testID="custom-heading">
          <Text>CUSTOM: {node.content}</Text>
        </View>
      ),
    };
    const tree = create(<Markdown rules={customRules}>{comprehensiveMarkdown}</Markdown>);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders simple paragraph text correctly', () => {
    const tree = create(<Markdown>{'Hello world'}</Markdown>);
    const json = JSON.stringify(tree.toJSON());
    expect(json).toContain('Hello world');
  });

  it('renders multiple elements without errors', () => {
    const markdown = '# Title\n\nParagraph with **bold** and *italic*.\n\n- List item\n\n> Quote';
    const tree = create(<Markdown>{markdown}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('handles backslash escaping correctly (Issue #146)', () => {
    const tree = create(<Markdown>{'7\\.'}</Markdown>);
    const json = JSON.stringify(tree.toJSON());
    expect(json).toContain('7.');
    expect(json).not.toContain('7\\.');
  });
});
