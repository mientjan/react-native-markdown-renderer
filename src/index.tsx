import React, { useMemo } from 'react';
import type { ReactElement } from 'react';
import parser from './lib/parser';
import applyStyle from './lib/util/applyStyle';
import getUniqueID from './lib/util/getUniqueID';
import hasParents from './lib/util/hasParents';
import openUrl from './lib/util/openUrl';
import tokensToAST from './lib/util/tokensToAST';
import defaultRenderRules from './lib/renderRules';
import AstRenderer from './lib/AstRenderer';
import MarkdownIt from 'markdown-it';
import PluginContainer from './lib/plugin/PluginContainer';
import blockPlugin from './lib/plugin/blockPlugin';
import { styles } from './lib/styles';
import { stringToTokens } from './lib/util/stringToTokens';
import type { ASTNode, RenderFunction, RenderRules, MarkdownStyles } from './types';

export {
  applyStyle,
  getUniqueID,
  openUrl,
  hasParents,
  defaultRenderRules as renderRules,
  AstRenderer,
  parser,
  stringToTokens,
  tokensToAST,
  MarkdownIt,
  PluginContainer,
  blockPlugin,
  styles,
};

export type { ASTNode, RenderFunction, RenderRules, MarkdownStyles };

export interface MarkdownProps {
  children: string | string[];
  rules?: RenderRules;
  style?: Partial<MarkdownStyles>;
  renderer?: AstRenderer | ((nodes: ASTNode[]) => ReactElement);
  markdownit?: MarkdownIt;
  plugins?: PluginContainer[];
}

export type { MarkdownProps as MarkdownPropsType };

const defaultMarkdownIt = MarkdownIt({ typographer: true });

export default function Markdown({
  children,
  rules,
  style,
  renderer: rendererProp,
  markdownit = defaultMarkdownIt,
  plugins = [],
}: MarkdownProps): ReactElement {
  if (rendererProp && rules) {
    console.warn(
      'react-native-markdown-renderer you are using renderer and rules at the same time. This is not possible, props.rules is ignored'
    );
  }

  if (rendererProp && style) {
    console.warn(
      'react-native-markdown-renderer you are using renderer and style at the same time. This is not possible, props.style is ignored'
    );
  }

  const markdownParser = useMemo(() => {
    let md = markdownit;
    if (plugins.length > 0) {
      plugins.forEach((plugin) => {
        md = md.use.apply(md, plugin.toArray() as [any, ...any[]]);
      });
    }
    return md;
  }, [markdownit, plugins]);

  const resolvedRenderer = useMemo(() => {
    if (rendererProp) {
      if (typeof rendererProp === 'function') {
        return { render: rendererProp };
      }
      if (rendererProp instanceof AstRenderer) {
        return rendererProp;
      }
      throw new Error('Provided renderer is not compatible with function or AstRenderer. please change');
    }
    return new AstRenderer(
      {
        ...defaultRenderRules,
        ...(rules || {}),
      },
      {
        ...styles,
        ...style,
      }
    );
  }, [rendererProp, rules, style]);

  const copy = useMemo(() => {
    return Array.isArray(children) ? children.join('') : children;
  }, [children]);

  return useMemo(() => {
    return parser(copy, resolvedRenderer.render, markdownParser);
  }, [copy, resolvedRenderer, markdownParser]);
}
