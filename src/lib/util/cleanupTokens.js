import getTokenTypeByToken from "./getTokenTypeByToken";
import groupTextTokens from "./groupTextTokens";
import removeInlineTokens from "./removeInlineTokens";

export function cleanupTokens(tokens) {
  tokens = removeInlineTokens(tokens);
  tokens.forEach(token => (token.type = getTokenTypeByToken(token)));
  return tokens;
}
