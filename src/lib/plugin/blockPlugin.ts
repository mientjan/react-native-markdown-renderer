/* eslint-disable @typescript-eslint/no-explicit-any */

export interface BlockPluginOptions {
  marker?: string;
  marker_end?: string;
  validate?: (params: string) => boolean;
  render?: (tokens: any[], idx: number, options: any, env: any, self: any) => any;
}

export default function blockPlugin(md: any, name: string, options?: BlockPluginOptions): void {
  function validateDefault(params: string): boolean {
    return params.trim().split(' ', 2)[0] === name;
  }

  function renderDefault(tokens: any[], idx: number, _options: any, env: any, self: any): any {
    return self.renderToken(tokens, idx, _options, env, self);
  }

  const opts = options || {};

  const min_markers = 1;
  const marker_str = opts.marker || `[${name}]`;
  const marker_end_str = opts.marker_end || `[/${name}]`;
  const marker_char = marker_str.charCodeAt(0);
  const marker_len = marker_str.length;
  const marker_end_len = marker_end_str.length;

  const validate = opts.validate || validateDefault;
  const render = opts.render || renderDefault;

  function container(state: any, startLine: number, endLine: number, silent: boolean): boolean {
    let pos: number;
    let nextLine: number;
    let marker_count: number;
    let markup: string;
    let params: string;
    let token: any;
    let old_parent: any;
    let old_line_max: number;
    let auto_closed = false;
    const start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];

    if (marker_char !== state.src.charCodeAt(start)) {
      return false;
    }

    for (pos = start + 1; pos <= max; pos++) {
      if (marker_str[(pos - start) % marker_len] !== state.src[pos]) {
        break;
      }
    }

    marker_count = Math.floor((pos - start) / marker_len);
    if (marker_count < min_markers) {
      return false;
    }
    pos -= (pos - start) % marker_len;

    markup = state.src.slice(start, pos);
    params = state.src.slice(pos, max);

    if (silent) {
      return true;
    }

    nextLine = startLine;

    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        break;
      }

      const lineStart = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (lineStart < max && state.sCount[nextLine] < state.blkIndent) {
        break;
      }

      if (marker_char !== state.src.charCodeAt(lineStart)) {
        continue;
      }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        continue;
      }

      for (pos = lineStart + 1; pos <= max; pos++) {
        if (marker_end_str[(pos - lineStart) % marker_end_len] !== state.src[pos]) {
          break;
        }
      }

      if (Math.floor((pos - lineStart) / marker_end_len) < marker_count) {
        continue;
      }

      pos -= (pos - lineStart) % marker_end_len;
      pos = state.skipSpaces(pos);

      if (pos < max) {
        continue;
      }

      auto_closed = true;
      break;
    }

    old_parent = state.parentType;
    old_line_max = state.lineMax;
    state.parentType = 'container';

    state.lineMax = nextLine;

    token = state.push(`container_${name}_open`, name, 1);
    token.markup = markup;
    token.block = true;
    token.info = params;
    token.map = [startLine, nextLine];

    state.md.block.tokenize(state, startLine + 1, nextLine);

    token = state.push(`container_${name}_close`, name, -1);
    token.markup = state.src.slice(state.bMarks[nextLine] + state.tShift[nextLine], pos);
    token.block = true;

    state.parentType = old_parent;
    state.lineMax = old_line_max;
    state.line = nextLine + (auto_closed ? 1 : 0);

    return true;
  }

  md.block.ruler.before('fence', 'container_checklist', container, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });

  md.renderer.rules['container_' + name + '_open'] = render;
  md.renderer.rules['container_' + name + '_close'] = render;
}
