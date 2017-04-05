/* eslint-disable */
import * as types from './mutation-types';

// export const decrementMain = ({ commit }) => {
//   commit(types.DECREMENT_MAIN_COUNTER)
// }
//
// export const incrementMain = ({ commit }) => {
//   commit(types.INCREMENT_MAIN_COUNTER)
// }

export const appendTextContent = ({ commit }) => {
  commit(types.APPEND_TEXT_CONTENT);
};

export const deleteTextContent = ({ commit }) => {
  commit(types.DELETE_TEXT_CONTENT);
};

export const changeStarStatus = ({ commit }) => {
  commit(types.CHANGE_STAR_STATUS);
};
