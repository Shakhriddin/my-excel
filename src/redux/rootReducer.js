import {
  APPLY_STYLE,
  CHANGE_TEXT, CHANGE_TITLE,
  CURRENT_STYLES,
  TABLE_RESIZE,
} from './types';

export function rootReducer(state, action) {
  let field;
  let val;
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      return {
        ...state, [field]: prevState(field, state, action),
      };
    case CHANGE_TEXT:
      field = 'dataState';
      return {
        ...state,
        currentText: action.data.value,
        [field]: prevState(field, state, action),
      };
    case CURRENT_STYLES:
      field = 'currentStyle';
      return {...state, currentStyles: action.data};
    case APPLY_STYLE:
      field = 'stylesState';
      val = state[field] || {};
      action.data.ids.forEach(id => {
        val[id] = {
          ...val[id], ...action.data.value,
        }
        ;
      });
      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...action.data.value},
      };
    case CHANGE_TITLE:
      return {...state, title: action.title};
    default:
      return state;
  }
}

function prevState(field, state, action) {
  const prevState = state[field] || {};
  prevState[action.data.id] = action.data.value;
  return prevState;
}
