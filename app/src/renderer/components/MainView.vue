<template>
  <div class="wrapper">
    <Clipboard :items="items"></Clipboard>
    <FunctionBar></FunctionBar>
  </div>
</template>

<script>
  import fs from 'fs';

  let temp = require('./../../temp.json');
  fs.watchFile('/Users/Phantr4x/GitHub/clipaste/app/src/temp.json', {
    persistent: true,
    interval: 120,
  }, () => {
    temp = require('/Users/Phantr4x/GitHub/clipaste/app/src/temp.json');
  });

  import Clipboard from './MainView/Clipboard';
  import FunctionBar from './MainView/FunctionBar';

  export default {
    data() {
      return {
        items: temp,
      };
    },
    methods: {
    },
    components: {
      Clipboard,
      FunctionBar,
    },
    name: 'main',
  };
</script>

<style scoped>

</style>
