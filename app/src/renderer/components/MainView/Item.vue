<template>
  <li class="item">
    <slot>
      <p class="item-text"></p>
      <p class="item-image"></p>
    </slot>
  </li>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
    },
  };
</script>

<style scoped>
  li.item {
    box-sizing: border-box;
    position: relative;
    width: 360px;
    height: 48px;
    padding: 0 8px;
  }
  p.item-text {
    box-sizing: border-box;
    height: 48px;
    padding: 0 8px;
    font: normal 16px/48px caption, "Verdana", "Myriad Pro", "Avenir Next", "Helvetica Neue", "Arial";
    color: #2B2F38;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  p.item-image {
    box-sizing: border-box;
    height: 48px;
    border-radius: 4px;
    background-color: transparent;
    background-image: none;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
  }
</style>
