# Changelog

## 4.0.0-alpha.0

### Breaking Changes

- **Minimum React 18.0.0** (was 16.2.0)
- **Minimum React Native 0.73.0** (was 0.50.4)
- **`react-native-fit-image` removed** - The default `image` render rule now uses React Native's built-in `<Image>` component. Users who need auto-sizing image behavior should provide a custom `image` render rule.
- **`prop-types` removed** - Runtime prop validation is no longer performed. Use TypeScript for type checking.
- **Class component replaced with function component** - `<Markdown>` is now a function component using hooks. Code relying on class instance methods or refs will break.
- **`markdown-it` upgraded from ^8 to ^14** - Custom markdown-it plugins should verify compatibility.
- **Package entry points changed** - `main` now points to `lib/commonjs/index.js`, `module` to `lib/module/index.js`, `types` to `lib/typescript/index.d.ts`.

### New Features

- Full TypeScript source with auto-generated type declarations
- Exported types: `ASTNode`, `RenderFunction`, `RenderRules`, `MarkdownStyles`, `MarkdownProps`
- ESM module output via react-native-builder-bob
- Proper memoization using `useMemo` hooks for better rendering performance

### Improvements

- All source converted from JavaScript to TypeScript
- Deprecated `componentWillMount` and `componentWillReceiveProps` replaced with hooks
- Broken `PropTypes` import from `react` removed in AstRenderer
- Unused `React` and `View` imports removed from parser
- ESLint + Prettier configured
- Jest test suite with 99 tests across 17 suites
- Integration snapshot tests for comprehensive markdown rendering

### Removed

- `react-native-fit-image` dependency
- `prop-types` dependency
- `chokidar` and `fs-extra` dev dependencies
- `bin/` build scripts (replaced by react-native-builder-bob)
- `export.json` debug artifact
- Hand-written `index.d.ts` (replaced by auto-generated types)
- `.npmignore` (replaced by `files` field in package.json)
