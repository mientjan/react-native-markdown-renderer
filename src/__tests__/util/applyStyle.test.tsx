import React from 'react';
import { create } from 'react-test-renderer';
import applyStyle from '../../lib/util/applyStyle';

describe('applyStyle', () => {
  const TextComponent: React.FC<{ style?: unknown; children?: React.ReactNode }> & { displayName?: string } = ({
    children,
    ...props
  }) => React.createElement('Text', props, children);
  TextComponent.displayName = 'Text';

  const ViewComponent: React.FC<{ children?: React.ReactNode }> & { displayName?: string } = ({ children }) =>
    React.createElement('View', null, children);
  ViewComponent.displayName = 'View';

  it('applies style to children whose type.displayName matches', () => {
    const children = [React.createElement(TextComponent, { key: '1', style: { color: 'red' } }, 'hello')];
    const result = applyStyle(children, { fontWeight: 'bold' }, 'Text');
    expect(result).toHaveLength(1);
    // The resulting element should have merged styles
    expect(result[0].props.style).toEqual(expect.arrayContaining([{ color: 'red' }, { fontWeight: 'bold' }]));
  });

  it('does not modify children whose type.displayName does not match', () => {
    const children = [React.createElement(ViewComponent, { key: '1' }, 'hello')];
    const result = applyStyle(children, { fontWeight: 'bold' }, 'Text');
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe(ViewComponent);
  });

  it('normalizes single style to array', () => {
    const children = [React.createElement(TextComponent, { key: '1', style: { color: 'red' } }, 'hello')];
    const singleStyle = { fontWeight: 'bold' };
    const result = applyStyle(children, singleStyle, 'Text');
    expect(result[0].props.style).toEqual(expect.arrayContaining([{ fontWeight: 'bold' }]));
  });
});
