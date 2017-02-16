<template>
  <div class="item">
    <p class="item-content">{{ text }}</p>
    <div class="tool-bar">
      <ul>
        <li><a href="" class="tool-bar-button"><i class="icon-pin">
          <svg width="32px" height="32px" viewBox="233 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icon-pin" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(233.000000, 0.000000)">
              <g id="pin" transform="translate(4.000000, 4.000000)" fill="#E3E8EE">
                <path d="M5,4 L5,6 L19,6 L19,4 L5,4 L5,4 Z M5,14 L9,14 L9,20 L15,20 L15,14 L19,14 L12,7 L5,14 L5,14 Z" id="Shape"></path>
              </g>
            </g>
          </svg>
        </i></a></li>
        <li><a href="" class="tool-bar-button"><i class="icon-delete">
          <svg width="32px" height="32px" viewBox="273 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="icon-delete" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(273.000000, 0.000000)">
                <g id="delete" transform="translate(4.000000, 4.000000)" fill="#E3E8EE">
                  <path d="M6,19 C6,20.1 6.9,21 8,21 L16,21 C17.1,21 18,20.1 18,19 L18,7 L6,7 L6,19 L6,19 Z M19,4 L15.5,4 L14.5,3 L9.5,3 L8.5,4 L5,4 L5,6 L19,6 L19,4 L19,4 Z" id="Shape"></path>
                </g>
              </g>
          </svg>
        </i></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        text: 'Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum',
      };
    },
  };
</script>

<style scoped>
  .item {
    float: left;
    position: relative;
    box-sizing: border-box;
    width: 360px;
    height: 48px;
    padding: 0 8px;
    border-bottom: 1px solid #464C5B;
  }
  .item:hover {
    border-bottom: none;
    background: #3091F2;
  }
  .item:hover p.item-content {
    color: #F5F7F9;
  }
  .item:hover .tool-bar {
    opacity: 1;
  }

  p.item-content {
    height: 32px;
    margin: 8px 0;
    /*padding-right: 32px;*/
    font: normal 16px/32px caption, "Myriad Pro", "Avenir Next", "Helvetica Neue", "Arial";
    color: #9EA7B4;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .tool-bar {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    width: 88px;
    height: 48px;
    /*padding: 0 8px;*/
    background: #3091F2;
    opacity: 0;
  }
  a.tool-bar-button, a.tool-bar-button i {
    display: inline-block;
    width: 32px;
    height: 32px;
  }
  a.tool-bar-button {
    float: left;
    margin: 8px 0 8px 8px;
  }
  a.tool-bar-button i.icon-pin {
    transform: scale(1.05);
    transition: transform .24s cubic-bezier(0.95, 0.05, 0.795, 0.035);
  }
  a.tool-bar-button:hover i.icon-pin {
    transform: scale(1.2) translateY(-3px);
  }
  a.tool-bar-button i.icon-delete {
    transition: transform .24s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  }
  a.tool-bar-button:hover i.icon-delete {
    transform: rotate(-15deg) scale(1.2);
  }
  a.tool-bar-button i svg g g {
    transition: fill .24s ease-in-out;
  }
  a.tool-bar-button:hover i svg g g {
    fill: #F5F7F9;
  }
</style>
