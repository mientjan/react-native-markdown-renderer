/**
 * Base Markdown component
 * @author Mient-jan Stelling
 */
import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import { View } from 'react-native';
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
 * react-native-markdown-renderer
 */
export default class Markdown extends Component {
  /**
   * Definition of the prop types
   */
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderer: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(AstRenderer)]),
    onLinkPress: PropTypes.func,
    testID: string,
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

  /**
   * Default Props
   */
  static defaultProps = {
    renderer: null,
    rules: null,
    plugins: [],
    style: null,
    markdownit: MarkdownIt({
      typographer: true,
    }),
  };

  copy = '';
  renderer = null;
  markdownParser = null;

  /**
   * Only when the copy changes will the markdown render again.
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const copy = this.getCopyFromChildren(nextProps.children);

    if (copy !== this.copy) {
      this.copy = copy;
      return true;
    }

    if (
      nextProps.renderer !== this.props.renderer ||
      nextProps.style !== this.props.style ||
      nextProps.plugins !== this.props.plugins ||
      nextProps.rules !== this.props.rules ||
      nextProps.markdownit !== this.props.markdownit
    ) {
      return true;
    }

    return false;
  }

  /**
   *
   * @param props
   */
  updateSettings(props = this.props) {
    const { renderer, rules, style, plugins, markdownit } = props;

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
      if (typeof renderer === 'function') {
        if (!this.renderer || this.renderer.render !== renderer) {
          this.renderer = {
            render: renderer,
          };
        }
      } else if (renderer instanceof AstRenderer) {
        if (this.renderer !== renderer) {
          this.renderer = renderer;
        }
      } else {
        throw new Error('Provided renderer is not compatible with function or AstRenderer. please change');
      }
    } else {
      if (!this.renderer || this.props.renderer || this.props.rules !== rules || this.props.style !== style) {
        this.renderer = new AstRenderer(
          {
            ...renderRules,
            ...(rules || {}),
          },
          {
            ...styles,
            ...style,
          },
          props.onLinkPress,
          props.testID
        );
      }
    }

    if (!this.markdownParser || this.props.markdownit !== markdownit || plugins !== this.props.plugins) {
      let md = markdownit;
      if (plugins && plugins.length > 0) {
        plugins.forEach(plugin => {
          md = md.use.apply(md, plugin.toArray());
        });
      }

      this.markdownParser = md;
    }
  }

  /**
   *
   */
  componentWillMount() {
    this.updateSettings(this.props);
  }

  /**
   *
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    this.updateSettings(nextProps);
  }

  /**
   *
   * @param children
   * @return {string}
   */
  getCopyFromChildren(children = this.props.children) {
    return children instanceof Array ? children.join('') : children;
  }

  /**
   *
   * @return {View}
   */
  render() {
    const copy = (this.copy = this.getCopyFromChildren());
    return parser(copy, this.renderer.render, this.markdownParser);
  }
}
