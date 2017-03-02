<template>
  <div class="wrapper">
    <SearchBar></SearchBar>
    <Contents></Contents>
    <FunctionBar></FunctionBar>
  </div>
</template>

<script>
  import { clipboard } from 'electron';

  import SearchBar from './MainView/SearchBar';
  import FunctionBar from './MainView/FunctionBar';
  import Contents from './MainView/Contents';

  let txt;

  export default {
    data() {
      txt = clipboard.readText();
      return {
        txt,
      };
    },
    components: {
      SearchBar,
      FunctionBar,
      Contents,
    },
    methods: {
    },
    name: 'main',
  };
</script>

<style scoped>

</style>
