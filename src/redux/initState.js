import {defaultStyles, defaultTitle} from '../constants';
import {storage} from '../core/utils';

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const initState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;