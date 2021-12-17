import {$} from '../../core/dom';

export class Excel {
  constructor(selector, options) {
    this.$element = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.ClassName);
      const component = new Component($el);

      $el.html(component.toHTML());
      $root.append($el);

      return component;
    });

    return $root;
  }

  render() {
    this.$element.append(this.getRoot());
    this.components.forEach(component => component.init());
  }
}