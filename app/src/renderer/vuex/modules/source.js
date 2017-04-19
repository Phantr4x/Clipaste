/* eslint-disable */
import * as types from '../mutation-types';

const state = {
  storage: [],
}

const mutations = {
  [types.IMPORT_DATA] (state, payload) {
    state.storage = [...payload];
  },
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
  [types.APPEND_IMAGE_CONTENT] (state, payload) {
    state.storage = [...state.storage, { id: payload.id, image: payload.image, star: payload.star }];
  },
  [types.DELETE_IMAGE_CONTENT] (state, payload) {
    state.storage = state.storage.filter((elm, idx, arr) => elm.id !== payload);
  },
  [types.UPDATE_IMAGE_CONTENT] (state, payload) {
    for (let item of state.storage) {
      if (item.image === payload.image) {
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
