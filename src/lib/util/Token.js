export default class Token {
  constructor(type, nesting = 0, children = null) {
    this.type = type;
    this.nesting = nesting;
    this.children = children;
  }
}
