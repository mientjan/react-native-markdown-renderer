# Changelog

## 4.1.0

### New Features

- `onLinkPress` prop — custom link press handler, falls back to `Linking.openURL()`
- `mergeStyle` prop (default `true`) — deep-merge custom styles with defaults per key instead of replacing entire style objects
- `debugPrintTree` prop — log the AST tree structure to console for debugging
- `maxTopLevelChildren` + `topLevelMaxExceededItem` props — preview mode to limit rendered top-level children
- `allowedImageHandlers` + `defaultImageHandler` props — validate image URL schemes before rendering
- Image accessibility — `accessibilityLabel` and `accessible` set from image alt text

### Bug Fixes

- Hardbreak renders as `<Text>{'\n'}</Text>` instead of `<View>` — fixes crash on Android when hardbreak is inside a Text node
- Code block and fence rules trim trailing newline added by markdown-it parser
- Ordered list respects the `start` attribute (e.g. `57. foo` now renders as 57 instead of 1)

### Internal

- `RenderFunction` type extended with `...args: unknown[]` rest parameter for backward-compatible extra arguments
- New `AstRendererOptions` interface for renderer configuration
- `AstRenderer` constructor accepts optional third `options` argument
- 41 new unit tests (140 total across 17 suites)

## 4.0.1

### Bug Fixes

- Resolved open issues and added missing render rules

### Documentation

- Moved v3 examples from `doc/example/` into `example/screens/` as v4 TypeScript function components
- Added React Navigation with 5 interactive example screens (basic, file loading, custom styles, custom rules, custom renderer)
- Created GitHub wiki with 8 documentation pages (Getting Started, Custom Styles, Custom Rules, Custom Renderer, Plugins, API Reference, Migration from v3)
- Added npm/GitHub badges, package links, Examples section, and Documentation section to README
- Removed outdated `doc/` directory

## 4.0.0

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
