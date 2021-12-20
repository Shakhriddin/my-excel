export class Emitter {
  constructor() {
    this.listeners = {};
  }


  // dispatch,fire,trigger
  // table.emit('table:select',{a:1})
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false;
    }

    this.listeners[eventName].forEach(listener => {
      listener(...args);
    });
    return true;
  }

  subscribe(eventName, func) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(func);
    return () => {
      this.listeners[eventName] =
        this.listeners[eventName].filter(listener => func !== listener);
    };
  }
}
