import getIsTextType from './getIsTextType';
import Token from './Token';
import getIsInlineTextType from "./getIsInlineTextType";

export default function groupTextTokens(tokens) {
  const result = [];

  let hasGroup = false;
  tokens.forEach(token => {
    if (getIsTextType(token.type) && !hasGroup) {
      hasGroup = true;
      result.push(new Token('textgroup', 1));
	    result.push(token);
    } else if(getIsTextType(token.type) && !getIsInlineTextType(token.type) && hasGroup) {
	    hasGroup = false;
	    result.push(token);
	    result.push(new Token('textgroup', -1));
    } else if (!getIsTextType(token.type) && hasGroup) {
      hasGroup = false;
      result.push(new Token('textgroup', -1));
	    result.push(token);
    } else {
	    result.push(token);
    }


  });

  return result;
}
