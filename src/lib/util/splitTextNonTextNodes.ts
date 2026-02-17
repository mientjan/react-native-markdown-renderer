import type { ReactElement } from 'react';

interface SplitResult {
  textNodes: ReactElement[];
  nonTextNodes: ReactElement[];
}

export default function splitTextNonTextNodes(children: ReactElement[]): SplitResult {
  return children.reduce<SplitResult>(
    (acc, curr) => {
      const displayName = (curr.type as { displayName?: string })?.displayName;
      if (displayName === 'Text') {
        acc.textNodes.push(curr);
      } else {
        acc.nonTextNodes.push(curr);
      }

      return acc;
    },
    { textNodes: [], nonTextNodes: [] }
  );
}
