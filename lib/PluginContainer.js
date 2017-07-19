export default class PluginContainer {
  constructor(plugin, ...options) {
    this.plugin = plugin;
    this.options = options;
  }

  toArray() {
    return [this.plugin, ...this.options];
  }
}
