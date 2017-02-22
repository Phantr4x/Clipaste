<template>
  <div class="wrapper">
    <SearchBar></SearchBar>
    <Contents></Contents>
    <FunctionBar></FunctionBar>
  </div>
</template>

<script>
  import SearchBar from './MainView/SearchBar';
  import FunctionBar from './MainView/FunctionBar';
  import Contents from './MainView/Contents';

  export default {
    components: {
      SearchBar,
      FunctionBar,
      Contents,
    },
    name: 'main',
  };
</script>

<style scoped>

</style>
