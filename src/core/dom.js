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
