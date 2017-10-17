/**
 *
 * @param {Array} parents
 * @param {string} type
 * @return {boolean}
 */
export function hasParents(parents, type) {
  return parents.findIndex(el => el.type === type) > -1;
}


/**
 *
 * @param {Array} parents
 * @param {function} type
 * @return {boolean}
 */
export function hasParentsByFunction(parents, isType) {
	return parents.findIndex(el => isType(el)) > -1;
}