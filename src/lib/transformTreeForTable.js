function transformTable(node) {
  const tHead = node.children.find(n => n.type === 'thead');
  const tBody = node.children.find(n => n.type === 'tbody');
  const columnCount = tBody.children.find(n => n.type === 'tr').children.length;
  const columns = [...Array(columnCount).keys()].map(() => ({
    type: 'tcolumn',
    sourceType: 'tcolumn',
    block: true,
    children: [],
  }));
  [...tHead.children, ...tBody.children]
    .filter(n => n.type === 'tr')
    .forEach(row =>
      row.children.forEach((cell, idx) => {
        return columns[idx].children.push({
          ...cell,
          index: columns[idx].children.length,
        });
      })
    );
  return { ...node, children: columns };
}

export default function transformTreeForTable(astTree) {
  return astTree.map(node => {
    if (node.type === 'table') return transformTable(node);
    return node;
  });
}
