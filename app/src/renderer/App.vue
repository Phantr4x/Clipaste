<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store';
  export default {
    store,
  };
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * { margin: 0; padding: 0; outline: 0; -webkit-user-select:none; cursor: default; }
  input { cursor: text; }
  ol, ul { list-style: none; }

  html,
  body {
    width: 100%;
  }


  body {
    font-family: caption, "Myriad Pro", "Avenir Next", "Helvetica Neue", "Arial";
    color: #F5F7F9;
  }
</style>
