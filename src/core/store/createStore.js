import {clone} from '../functions/utils';

export function createStore(rootReducer, initState = {}) {
  let state = rootReducer(initState, {type: '__INIT__'});
  let listeners = [];

  return {

    subscribe(func) {
      listeners.push(func);
      return {
        unsubscribe() {
          listeners = listeners.filter(listener => listener !== func);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach(listener => listener(state));
    },
    getState() {
      return clone(state);
    },
  };
}
