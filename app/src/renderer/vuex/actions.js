/* eslint-disable */
import * as types from './mutation-types';

export const appendTextContent = ({ commit }) => {
  commit(types.APPEND_TEXT_CONTENT);
};

export const deleteTextContent = ({ commit }) => {
  commit(types.DELETE_TEXT_CONTENT);
};

export const changeStarStatus = ({ commit }) => {
  commit(types.CHANGE_STAR_STATUS);
};
