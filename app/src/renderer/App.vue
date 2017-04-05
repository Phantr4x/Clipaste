<template>
  <div id="#app">
    <Panel></Panel>
  </div>
</template>

<script>
  // import fs from 'fs';
  // import { remote, clipboard } from 'electron';

  import Panel from 'components/Panel';
  
  import clipocher from 'renderer/clipocher';
  import store from 'renderer/vuex/store';

  export default {
    name: 'app',
    store,
    data() {
      return {

      };
    },
    mounted() {
      clipocher({
        delay: 300,
        ontextchange: (txt) => {
          const timestamp = new Date().getTime();
          let hasText = false;

          this.$store.state.source.storage.forEach((el) => {
            if (el.text === txt) {
              this.$store.commit('UPDATE_TEXT_CONTENT', {
                text: txt,
                updateId: timestamp,
              });
              hasText = true;
            }
          });

          if (!hasText) {
            this.$store.commit('APPEND_TEXT_CONTENT', {
              id: timestamp,
              text: txt,
              star: false,
            });
          }
        },
      });
    },
    components: { Panel },
  };
</script>

<style>
  @import url(https://fonts.googleapis.com/icon?family=Material+Icons);
  /*@import url(https://fonts.googleapis.com/css?family=Lato:300);*/
  * { margin: 0; padding: 0; outline: 0; -webkit-user-select: none; cursor: default; }
  input { cursor: text; }
  ol, ul { list-style: none; }

  html,
  body {
    width: 100%;
  }

  body {
    font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: #1F2D3D;
  }
</style>
