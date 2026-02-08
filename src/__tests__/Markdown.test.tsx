import React from 'react';
import { create, act } from 'react-test-renderer';
import Markdown from '../index';
import AstRenderer from '../lib/AstRenderer';
import renderRules from '../lib/renderRules';
import { styles } from '../lib/styles';
import MarkdownIt from 'markdown-it';
import PluginContainer from '../lib/plugin/PluginContainer';
import type { ASTNode } from '../types';
import { Text, View } from 'react-native';

describe('Markdown', () => {
  it('renders a simple markdown string without crashing', () => {
    const tree = create(<Markdown>{'# Hello'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders with children as string array', () => {
    const tree = create(<Markdown>{['# Hello', '\nworld']}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders headings', () => {
    const tree = create(<Markdown>{'# H1\n## H2\n### H3'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders paragraphs', () => {
    const tree = create(<Markdown>{'This is a paragraph.'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders bold text', () => {
    const tree = create(<Markdown>{'**bold text**'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders italic text', () => {
    const tree = create(<Markdown>{'*italic text*'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders links', () => {
    const tree = create(<Markdown>{'[link](https://example.com)'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders images', () => {
    const tree = create(<Markdown>{'![alt](https://example.com/img.png)'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders unordered lists', () => {
    const tree = create(<Markdown>{'- item 1\n- item 2'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders ordered lists', () => {
    const tree = create(<Markdown>{'1. item 1\n2. item 2'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders code blocks', () => {
    const tree = create(<Markdown>{'```\ncode\n```'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders blockquotes', () => {
    const tree = create(<Markdown>{'> blockquote'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders tables', () => {
    const tree = create(<Markdown>{'| A | B |\n|---|---|\n| 1 | 2 |'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders horizontal rules', () => {
    const tree = create(<Markdown>{'---'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('applies custom rules override', () => {
    const customRules = {
      heading1: (node: ASTNode) => (
        <View key={node.key}>
          <Text>CUSTOM H1</Text>
        </View>
      ),
    };
    const tree = create(<Markdown rules={customRules}>{'# Hello'}</Markdown>);
    const json = JSON.stringify(tree.toJSON());
    expect(json).toContain('CUSTOM H1');
  });

  it('applies custom style override', () => {
    const customStyle = {
      heading1: { fontSize: 99 },
    };
    const tree = create(<Markdown style={customStyle}>{'# Hello'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders with custom renderer function', () => {
    const customRenderer = (nodes: ASTNode[]) => (
      <View key="custom">
        <Text>Custom Render</Text>
      </View>
    );
    const tree = create(<Markdown renderer={customRenderer}>{'# Hello'}</Markdown>);
    const json = JSON.stringify(tree.toJSON());
    expect(json).toContain('Custom Render');
  });

  it('renders with custom renderer as AstRenderer instance', () => {
    const renderer = new AstRenderer(renderRules, styles);
    const tree = create(<Markdown renderer={renderer}>{'# Hello'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders with custom markdownit instance', () => {
    const md = MarkdownIt({ typographer: false });
    const tree = create(<Markdown markdownit={md}>{'# Hello'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('renders with plugins array', () => {
    // Simple no-op plugin
    const noopPlugin = (md: MarkdownIt) => {};
    const container = new PluginContainer(noopPlugin);
    const tree = create(<Markdown plugins={[container]}>{'# Hello'}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('logs warning when both renderer and rules are provided', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const customRenderer = (nodes: ASTNode[]) => <View key="custom" />;
    create(
      <Markdown renderer={customRenderer} rules={{ text: () => null }}>
        {'# Hello'}
      </Markdown>
    );
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('renderer and rules'));
    warnSpy.mockRestore();
  });

  it('logs warning when both renderer and style are provided', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const customRenderer = (nodes: ASTNode[]) => <View key="custom" />;
    create(
      <Markdown renderer={customRenderer} style={{ heading1: { fontSize: 20 } }}>
        {'# Hello'}
      </Markdown>
    );
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('renderer and style'));
    warnSpy.mockRestore();
  });

  it('handles empty string input', () => {
    const tree = create(<Markdown>{''}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('handles whitespace-only input', () => {
    const tree = create(<Markdown>{'   '}</Markdown>);
    expect(tree.toJSON()).toBeTruthy();
  });

  it('re-renders when children prop changes', () => {
    let tree: ReturnType<typeof create>;
    act(() => {
      tree = create(<Markdown>{'# First'}</Markdown>);
    });
    const first = JSON.stringify(tree!.toJSON());

    act(() => {
      tree!.update(<Markdown>{'# Second'}</Markdown>);
    });
    const second = JSON.stringify(tree!.toJSON());

    expect(first).not.toBe(second);
  });
});
