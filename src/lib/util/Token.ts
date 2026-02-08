export default class Token {
  type: string;
  nesting: number;
  children: Token[] | null;
  block: boolean;

  constructor(type: string, nesting: number = 0, children: Token[] | null = null, block: boolean = false) {
    this.type = type;
    this.nesting = nesting;
    this.children = children;
    this.block = block;
  }
}
