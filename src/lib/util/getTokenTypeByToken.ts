export interface TokenLike {
  type?: string;
  tag?: string;
}

const regSelectOpenClose = /_open|_close/g;

export default function getTokenTypeByToken(token: TokenLike): string {
  let cleanedType = 'unknown';

  if (token.type) {
    cleanedType = token.type.replace(regSelectOpenClose, '');
  }

  switch (cleanedType) {
    case 'heading': {
      cleanedType = `${cleanedType}${(token.tag || '').substr(1)}`;
      break;
    }
  }

  return cleanedType;
}
