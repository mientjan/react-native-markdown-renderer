import React from 'react';
import splitTextNonTextNodes from '../../lib/util/splitTextNonTextNodes';

describe('splitTextNonTextNodes', () => {
  const TextComponent: React.FC<{ children?: React.ReactNode }> & { displayName?: string } = ({ children }) =>
    React.createElement('Text', null, children);
  TextComponent.displayName = 'Text';

  const ViewComponent: React.FC<{ children?: React.ReactNode }> & { displayName?: string } = ({ children }) =>
    React.createElement('View', null, children);
  ViewComponent.displayName = 'View';

  it('separates Text-type children from non-Text children', () => {
    const children = [
      React.createElement(TextComponent, { key: '1' }, 'text'),
      React.createElement(ViewComponent, { key: '2' }, 'view'),
      React.createElement(TextComponent, { key: '3' }, 'more text'),
    ];
    const result = splitTextNonTextNodes(children);
    expect(result.textNodes).toHaveLength(2);
    expect(result.nonTextNodes).toHaveLength(1);
  });

  it('returns empty arrays when no children provided', () => {
    const result = splitTextNonTextNodes([]);
    expect(result.textNodes).toEqual([]);
    expect(result.nonTextNodes).toEqual([]);
  });
});
