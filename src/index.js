/**
 * Base Markdown component
 * @author Mient-jan Stelling
 */
import { useMemo } from 'react';
import PropTypes from 'prop-types';
import parser from './lib/parser';
import applyStyle from './lib/util/applyStyle';
import getUniqueID from './lib/util/getUniqueID';
import hasParents from './lib/util/hasParents';
import openUrl from './lib/util/openUrl';
import tokensToAST from './lib/util/tokensToAST';
import renderRules from './lib/renderRules';
import AstRenderer from './lib/AstRenderer';
import MarkdownIt from 'markdown-it';
import PluginContainer from './lib/plugin/PluginContainer';
import blockPlugin from './lib/plugin/blockPlugin';
import { styles } from './lib/styles';
import { stringToTokens } from './lib/util/stringToTokens';
/**
 *
 */
export {
  applyStyle,
  getUniqueID,
  openUrl,
  hasParents,
  renderRules,
  AstRenderer,
  parser,
  stringToTokens,
  tokensToAST,
  MarkdownIt,
  PluginContainer,
  blockPlugin,
  styles,
};

/**
 *
 * @param children
 * @return {string}
 */
const getCopyFromChildren = children => {
  return children instanceof Array ? children.join('') : children;
};

const getRenderer = (renderer, rules, style) => {
  if (renderer && rules) {
    console.warn(
      'react-native-markdown-renderer you are using renderer and rules at the same time. This is not possible, props.rules is ignored'
    );
  }

  if (renderer && style) {
    console.warn(
      'react-native-markdown-renderer you are using renderer and style at the same time. This is not possible, props.style is ignored'
    );
  }

  // these checks are here to prevent extra overhead.
  if (renderer) {
    if (!(typeof renderer === 'function') || renderer instanceof AstRenderer) {
      return renderer;
    } else {
      throw new Error('Provided renderer is not compatible with function or AstRenderer. please change');
    }
  } else {
    return new AstRenderer(
      {
        ...renderRules,
        ...(rules || {}),
      },
      {
        ...styles,
        ...style,
      }
    );
  }
};

const getMarkdownParser = (markdownit, plugins) => {
  let md = markdownit;
  if (plugins && plugins.length > 0) {
    plugins.forEach(plugin => {
      md = md.use.apply(md, plugin.toArray());
    });
  }

  return md;
};

/**
 * react-native-markdown-renderer
 */
const Markdown = ({
  children,
  renderer = null,
  rules = null,
  plugins = [],
  style = null,
  markdownit = MarkdownIt({
    typographer: true,
  }),
}) => {
  const momoizedRenderer = useMemo(() => getRenderer(renderer, rules, style), [renderer, rules, style]);
  const markdownParser = useMemo(() => getMarkdownParser(markdownit, plugins), [markdownit, plugins]);

  const copy = (this.copy = getCopyFromChildren(children));
  return parser(copy, momoizedRenderer.render, markdownParser);
};

/**
 * Definition of the prop types
 */
Markdown.propTypes = {
  children: PropTypes.node.isRequired,
  renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(AstRenderer)]),
  rules: (props, propName, componentName) => {
    let invalidProps = [];
    const prop = props[propName];

    if (!prop) {
      return;
    }

    if (typeof prop === 'object') {
      invalidProps = Object.keys(prop).filter(key => typeof prop[key] !== 'function');
    }

    if (typeof prop !== 'object') {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must be of shape {[index:string]:function} `
      );
    } else if (invalidProps.length > 0) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. These ` +
          `props are not of type function \`${invalidProps.join(', ')}\` `
      );
    }
  },
  markdownit: PropTypes.instanceOf(MarkdownIt),
  plugins: PropTypes.arrayOf(PropTypes.instanceOf(PluginContainer)),
  style: PropTypes.any,
};

export default Markdown;
