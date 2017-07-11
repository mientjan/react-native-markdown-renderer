import { Component, PropTypes } from 'react';
import markdownParser from './lib/markdown';
import defaultRenderFunctions from './lib/defaultRenderFunctions';
import { AstRenderer } from './lib/AstGenerator';

/**
 * Base Markdown component
 * @author Mient-jan Stelling
 */
export default class Markdown extends Component {
  /**
	 * Definition of the prop types
	 */
  static propTypes = {
    children: PropTypes.node.isRequired,
    renderer: PropTypes.instanceOf(AstRenderer),
  };

  /**
	 * Default Props
	 */
  static defaultProps = {
    renderer: new AstRenderer(defaultRenderFunctions),
  };

  copy = '';

  /**
   * Only when the copy changes will the markdown render again.
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    const copy = nextProps.children instanceof Array
      ? nextProps.children.join('')
      : nextProps.children;

    if (copy !== this.copy) {
      this.copy = copy;
      return true;
    }

    return false;
  }

  /**
     *
	 * @return {View}
	 */
  render() {
    const { renderer } = this.props;
    const copy = this.copy;

    return markdownParser(copy, renderer);
  }
}
