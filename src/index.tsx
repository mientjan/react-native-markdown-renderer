import { useMemo } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
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
  onLinkPress?: (url: string) => boolean | void;
  mergeStyle?: boolean;
  debugPrintTree?: boolean;
  maxTopLevelChildren?: number | null;
  topLevelMaxExceededItem?: ReactNode;
  allowedImageHandlers?: string[];
  defaultImageHandler?: string | null;
}

export type { MarkdownProps as MarkdownPropsType };

const defaultMarkdownIt = MarkdownIt({ typographer: true });

function mergeStyles(
  defaultStyles: MarkdownStyles,
  userStyles?: Partial<MarkdownStyles>,
  shouldMerge: boolean = true
): MarkdownStyles {
  if (!userStyles) {
    return defaultStyles;
  }

  if (!shouldMerge) {
    return { ...defaultStyles, ...userStyles };
  }

  const merged: MarkdownStyles = { ...defaultStyles };

  for (const key of Object.keys(userStyles)) {
    if (key in merged) {
      merged[key] = {
        ...StyleSheet.flatten(merged[key] as any),
        ...StyleSheet.flatten(userStyles[key] as any),
      };
    } else {
      merged[key] = userStyles[key];
    }
  }

  return merged;
}

export default function Markdown({
  children,
  rules,
  style,
  renderer: rendererProp,
  markdownit = defaultMarkdownIt,
  plugins = [],
  onLinkPress,
  mergeStyle = true,
  debugPrintTree,
  maxTopLevelChildren,
  topLevelMaxExceededItem,
  allowedImageHandlers,
  defaultImageHandler,
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, prefer-spread
        md = md.use(...(plugin.toArray() as [any, ...any[]]));
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

    const resolvedStyles = mergeStyles(styles, style, mergeStyle);

    return new AstRenderer(
      {
        ...defaultRenderRules,
        ...(rules || {}),
      },
      resolvedStyles,
      {
        onLinkPress,
        debugPrintTree,
        maxTopLevelChildren,
        topLevelMaxExceededItem,
        allowedImageHandlers,
        defaultImageHandler,
      }
    );
  }, [rendererProp, rules, style, mergeStyle, onLinkPress, debugPrintTree,
      maxTopLevelChildren, topLevelMaxExceededItem, allowedImageHandlers, defaultImageHandler]);

  const copy = useMemo(() => {
    return Array.isArray(children) ? children.join('') : children;
  }, [children]);

  return useMemo(() => {
    return parser(copy, resolvedRenderer.render, markdownParser);
  }, [copy, resolvedRenderer, markdownParser]);
}
