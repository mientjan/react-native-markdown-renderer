/**
 *
 * @type {[string,string,string,string,string,string,string]}
 */
const textTypes = [
  'text',
  'span',
  'strong',
  'a',
  's',
  'em',
  'softbreak',
];

// 'heading1',
// 'heading2',
// 'heading3',
// 'heading4',
// 'heading5',
// 'heading6',

/**
 *
 * @param node
 * @return {boolean}
 */
export default function getIsTextType(type) {
  return textTypes.indexOf(type) > -1;
}
