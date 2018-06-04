import InlineTextTypes from "../data/InlineTextTypes"

/**
 *
 * @param node
 * @return {boolean}
 */
export default function getIsInlineTextType(type, ) {
  return InlineTextTypes.indexOf(type) > -1;
}
