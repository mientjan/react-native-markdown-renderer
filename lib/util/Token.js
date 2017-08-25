export default class Token {
  constructor(type, nesting = 0, children = null) {
    this.tag = type;
    this.nesting = nesting;
    this.children = children;
  }
}
