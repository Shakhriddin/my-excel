import {defaultStyles, defaultTitle} from '../constants';
import {clone, storage} from '../core/functions/utils';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON(),
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const initState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState);
}
