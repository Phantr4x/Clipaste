<template>
  <div class="wrapper">
    <SearchBar></SearchBar>
    <div class="contents">
      <Item></Item>
      <Item></Item>
      <Item></Item>
    </div>
    <FunctionBar></FunctionBar>
  </div>
</template>

<script>
  import SearchBar from './MainView/SearchBar';
  import FunctionBar from './MainView/FunctionBar';
  import Item from './MainView/Item.vue';

  export default {
    components: {
      SearchBar,
      FunctionBar,
      Item,
    },
    name: 'main',
  };
</script>

<style scoped>
  .contents {
    box-sizing: border-box;
    position: fixed;
    width: 360px;
    height: 480px;
    margin-top: 48px;
    overflow-y: auto;
  }
</style>
