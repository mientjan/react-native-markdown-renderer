const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '..');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot);

// Watch the library source so changes are picked up live
config.watchFolders = [libraryRoot];

// Only resolve node_modules from the example to avoid duplicate React
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
];

// Map the library and its runtime dep to the actual locations
config.resolver.extraNodeModules = {
  'react-native-markdown-renderer': libraryRoot,
  'markdown-it': path.resolve(libraryRoot, 'node_modules', 'markdown-it'),
};

// Allow importing .md files as assets
config.resolver.assetExts.push('md');

// Block the library's node_modules for packages the example already provides
config.resolver.blockList = [
  new RegExp(
    path.resolve(libraryRoot, 'node_modules').replace(/[/\\]/g, '[/\\\\]') +
      '[\\/\\\\](react|react-native|react-native-web|@react-native)[\\/\\\\].*'
  ),
];

module.exports = config;
