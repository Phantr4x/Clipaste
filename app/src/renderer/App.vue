<template>
  <div id="#app">
    <Panel></Panel>
  </div>
</template>

<script>
  /* eslint-disable */
  import { remote, ipcRenderer, nativeImage } from 'electron';
  import fs from 'fs';

  import Panel from 'renderer/components/Panel';

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
      console.time('[ImportData]');
      console.log(remote.getGlobal('history'));
      this.$store.commit('IMPORT_DATA', remote.getGlobal('history'));
      console.timeEnd('[ImportData]');

      clipocher({
        delay: 300,
        ontextchange: (txt) => {
          console.time('[TextChange]');
          const timestamp = new Date().getTime();
          let exist = false;

          this.$store.state.source.storage.forEach((el) => {
            if (el.text && el.text === txt) {
              this.$store.commit('UPDATE_TEXT_CONTENT', {
                text: txt,
                updateId: timestamp,
              });
              exist = true;
            }
          });

          if (!exist) {
            this.$store.commit('APPEND_TEXT_CONTENT', {
              id: timestamp,
              text: txt,
              star: false,
            });
          }
          console.timeEnd('[TextChange]');

          console.time('[ContentSync]');
          ipcRenderer.send('content-sync', JSON.stringify(this.$store.state.source.storage));
          console.timeEnd('[ContentSync]');
        },
        onimagechange: (img) => {
          console.time('[ImageChange]');
          console.time('Convert');
          img = img.toPNG();
          console.timeEnd('Convert');

          const timestamp = new Date().getTime();
          let exist = false;

          console.time('Save');
          ipcRenderer.send('image-append', timestamp, img);
          console.timeEnd('Save');

          console.time('Commit');
          if (!exist) {
            this.$store.commit('APPEND_IMAGE_CONTENT', {
              id: timestamp,
              image: `${remote.getGlobal('paths').appData}/Clipaste/temp/${timestamp}.png`,
              star: false,
            });
          }
          console.timeEnd('Commit');
          console.timeEnd('[ImageChange]');

          console.time('[ContentSync]');
          ipcRenderer.send('content-sync', JSON.stringify(this.$store.state.source.storage));
          console.timeEnd('[ContentSync]');
        },
      });
    },
    components: { Panel },
  };
</script>

<style>
  @import url(https://fonts.googleapis.com/icon?family=Material+Icons);

  * { margin: 0; padding: 0; outline: 0; -webkit-user-select: none; cursor: default; }

  html,
  body {
    width: 100%;
  }

  body {
    font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Source Han Sans", "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #1F2D3D;
  }

  input { cursor: text; }
  ol,
  ul { list-style: none; }
</style>
