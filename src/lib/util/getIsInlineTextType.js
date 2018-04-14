/**
 *
 * @type {[string,string,string,string,string,string,string]}
 */
const textTypes = [
  'text',
  'span',
  'strong',
  'link',
  's',
  'em',
  'br',
];

/**
 *
 * @param node
 * @return {boolean}
 */
export default function getIsInlineTextType(type) {
  return textTypes.indexOf(type) > -1;
}
