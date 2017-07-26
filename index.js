/**
 * Base Markdown component
 * @author Mient-jan Stelling
 */
import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { parser, stringToTokens, tokensToAST } from './lib/parser';
import defaultRenderFunctions from './lib/defaultRenderFunctions';
import AstRenderer from './lib/AstRenderer';
import MarkdownIt from 'markdown-it';
import PluginContainer from './lib/PluginContainer';
import blockPlugin from './lib/blockPlugin';

/**
 *
 */
export {
  defaultRenderFunctions,
  AstRenderer,
  parser,
  stringToTokens,
  tokensToAST,
  MarkdownIt,
  PluginContainer,
  blockPlugin,
};

export default class Markdown extends Component {
  /**
	 * Definition of the prop types
	 */
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderer: PropTypes.instanceOf(AstRenderer),
    plugins: PropTypes.arrayOf(PropTypes.instanceOf(PluginContainer)),
  };

  /**
	 * Default Props
	 */
  static defaultProps = {
    renderer: new AstRenderer(defaultRenderFunctions),
    plugins: [],
  };

  copy = '';

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

    return false;
  }

  /**
   *
   */
  componentWillMount() {
    if (this.props.plugins && this.props.plugins.length > 0 && !this.md) {
      let md = MarkdownIt();

      this.props.plugins.forEach(plugin => {
        md = md.use.apply(md, plugin.toArray());
      });

      this.md = md;
    }
  }

  getCopyFromChildren(children = this.props.children) {
    return children instanceof Array
      ? children.join('')
      : children;
  }

  /**
   *
   * @return {View}
   */
  render() {
    const copy = (this.copy = this.getCopyFromChildren());
    const { renderer } = this.props;

    return parser(copy, renderer, this.md);
  }
}
