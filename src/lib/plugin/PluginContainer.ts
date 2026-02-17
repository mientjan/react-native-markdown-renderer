export default class PluginContainer<T = unknown> {
  plugin: T;
  options: unknown[];

  constructor(plugin: T, ...options: unknown[]) {
    this.plugin = plugin;
    this.options = options;
  }

  toArray(): [T, ...unknown[]] {
    return [this.plugin, ...this.options];
  }
}
