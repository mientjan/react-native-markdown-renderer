import PluginContainer from '../../lib/plugin/PluginContainer';

describe('PluginContainer', () => {
  it('stores plugin and options from constructor', () => {
    const plugin = () => {};
    const container = new PluginContainer(plugin, 'opt1', 'opt2');
    expect(container.plugin).toBe(plugin);
    expect(container.options).toEqual(['opt1', 'opt2']);
  });

  it('toArray() returns [plugin, ...options]', () => {
    const plugin = () => {};
    const container = new PluginContainer(plugin, 'opt1', 'opt2');
    expect(container.toArray()).toEqual([plugin, 'opt1', 'opt2']);
  });

  it('works with no options', () => {
    const plugin = () => {};
    const container = new PluginContainer(plugin);
    expect(container.toArray()).toEqual([plugin]);
  });

  it('works with multiple options', () => {
    const plugin = () => {};
    const container = new PluginContainer(plugin, { a: 1 }, { b: 2 }, 'third');
    expect(container.toArray()).toEqual([plugin, { a: 1 }, { b: 2 }, 'third']);
  });
});
