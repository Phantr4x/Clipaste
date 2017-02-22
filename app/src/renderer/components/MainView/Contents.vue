<template>
  <div class="contents">
    <ul>
      <Item v-for="(item, index) in items"
            @mouseover.native="indicate(index)">
        <p class="item-content">{{ index }}. {{ item.text }}</p>
      </Item>
    </ul>
    <div id="indicator" style="top: 0px"></div>
  </div>
</template>

<script>
  import Item from './Item';
  export default {
    data() {
      return {
        items: [
          { text: 'Lorem Ipsum' },
          { text: '测试文本' },
          { text: '試験テキスト' },
        ],
      };
    },
    components: {
      Item,
    },
    computed: {
    },
    methods: {
      indicate(index) {
        document.querySelector('#indicator').style.top = `${48 * index}px`;
      },
    },
  };
</script>

<style scoped>
  .contents {
    box-sizing: border-box;
    position: relative;
    width: 360px;
    height: 480px;
    transform: translateY(48px);
    background: #FFFFFF;
    overflow-y: auto;
  }

  .contents ul {
    float: left;
  }

  #indicator {
    position: absolute;
    top: 0px;
    left: 8px;
    width: 344px;
    height: 48px;
    border-radius: 4px;
    background-color: #F5F7F9;
    transition: top .24s ease-in-out;
    z-index: -1;
  }
</style>
