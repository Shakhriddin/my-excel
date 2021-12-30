import {
  APPLY_STYLE,
  CHANGE_TEXT,
  CHANGE_TITLE,
  CURRENT_STYLES,
  TABLE_RESIZE,
} from './types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CURRENT_STYLES,
    data,
  };
}

// data = {ids, value}
export function applyStyles(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title,
  };
}
