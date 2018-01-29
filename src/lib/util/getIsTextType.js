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
  'softbreak',
];

/**
 *
 * @param node
 * @return {boolean}
 */
export default function getIsTextType(type) {
  return textTypes.indexOf(type) > -1;
}
