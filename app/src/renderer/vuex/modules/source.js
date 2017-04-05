/* eslint-disable */
import * as types from '../mutation-types';

const state = {
  storage: [],
}

const mutations = {
  [types.APPEND_TEXT_CONTENT] (state, payload) {
    state.storage = [...state.storage, { id: payload.id, text: payload.text, star: payload.star }];
  },
  [types.DELETE_TEXT_CONTENT] (state, payload) {
    state.storage = state.storage.filter((elm, idx, arr) => elm.id !== payload);
  },
  [types.UPDATE_TEXT_CONTENT] (state, payload) {
    for (let item of state.storage) {
      if (item.text === payload.text) {
        item.id = payload.updateId;
      }
    }
  },
  [types.CHANGE_STAR_STATUS] (state, payload) {
    for (let item of state.storage) {
      if (item.id === payload) {
        item.star = !item.star;
      }
    }
  },
}

export default {
  state,
  mutations
}
