class Dom {
  constructor(selector) {
    this.$element = (typeof selector === 'string')
      ?
      document.querySelector(selector) : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html;
      return this;
    }

    return this.$element.outerHTML.trim();
  }

  textContent(text) {
    if (typeof text === 'string') {
      return this.$element.textContent = text;
    }
    return this.$element.textContent.trim();
  }


  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$element.closest(selector));
  }

  getCoords() {
    return this.$element.getBoundingClientRect();
  }

  get data() {
    return this.$element.dataset;
  }

  find(selector) {
    return $(this.$element.querySelector(selector));
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector);
  }

  append(element) {
    if (element instanceof Dom) {
      element = element.$element;
    }
    if (Element.prototype.append) {
      this.$element.append(element);
    } else {
      this.$element.appendChild(element);
    }

    return this;
  }

  addClass(className) {
    this.$element.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$element.classList.remove(className);
    return this;
  }

  getDataID(parse) {
    if (parse) {
      const parsed = this.getDataID().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.$element.focus();
    return this;
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => {
      this.$element.style[key] = styles[key];
    });
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = function(tagName, classes = []) {
  const element = document.createElement(tagName);

  if (classes) {
    for (const oneClass of classes) {
      element.classList.add(oneClass);
    }
  }

  return $(element);
};
