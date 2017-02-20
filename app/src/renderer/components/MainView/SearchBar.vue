<template>
  <div class="search-bar">
    <input class="search-bar-input" type="text" name="search" value="" placeholder="Type to search..." />
    <i class="icon-search">
      <svg width="32px" height="32px" viewBox="8 8 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="icon-search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(8.000000, 8.000000)">
          <g id="search" transform="translate(4.000000, 4.000000)" fill="#2B2F38">
            <path d="M15.5,14 L14.71,14 L14.43,13.73 C15.41,12.59 16,11.11 16,9.5 C16,5.91 13.09,3 9.5,3 C5.91,3 3,5.91 3,9.5 C3,13.09 5.91,16 9.5,16 C11.11,16 12.59,15.41 13.73,14.43 L14,14.71 L14,15.5 L19,20.49 L20.49,19 L15.5,14 L15.5,14 Z M9.5,14 C7.01,14 5,11.99 5,9.5 C5,7.01 7.01,5 9.5,5 C11.99,5 14,7.01 14,9.5 C14,11.99 11.99,14 9.5,14 L9.5,14 Z" id="Shape"></path>
          </g>
        </g>
      </svg>
    </i>
    <a class="search-bar-button" href="#">
      <i class="icon-filter">
        <svg width="32px" height="32px" viewBox="320 8 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="icon-filter" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(320.000000, 8.000000)">
            <g id="filter" fill="#464C5B">
              <path d="M13.3333333,24 L18.6666667,24 L18.6666667,21.3333333 L13.3333333,21.3333333 L13.3333333,24 L13.3333333,24 Z M4,8 L4,10.6666667 L28,10.6666667 L28,8 L4,8 L4,8 Z M8,17.3333333 L24,17.3333333 L24,14.6666667 L8,14.6666667 L8,17.3333333 L8,17.3333333 Z" id="Shape"></path>
            </g>
          </g>
        </svg>
      </i>
    </a>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
  };
</script>

<style scoped>
  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 48px;
    /*border-bottom: 1px solid #464C5B;*/
    z-index: 999;
    background: #2B2F38;
  }

  input.search-bar-input, a.icon-filter { float: left; }

  input.search-bar-input {
    box-sizing: border-box;
    width: 304px;
    height: 32px;
    margin: 8px 0 8px 8px;
    padding: 0 0 0 32px;
    border: 0;
    border-radius: 4px;
    font: normal 16px/32px caption, "Myriad Pro", "Avenir Next", "Helvetica Neue", "Arial";
    color: #313540;
    background: #464C5B;
    transition: background .24s ease-in-out;
  }
  input.search-bar-input::-webkit-input-placeholder {
    color: #2B2F38;
    transition: color .24s ease-in-out;
  }
  input.search-bar-input:focus {
    background: #F5F7F9;
  }
  input.search-bar-input:focus::-webkit-input-placeholder {
    color: #9EA7B4;
  }

  i.icon-search {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 32px;
    height: 32px;
  }

  a.search-bar-button, i.icon-filter {
    display: inline-block;
    width: 32px;
    height: 32px;
  }
  a.search-bar-button {
    margin: 8px;
  }
  a.search-bar-button i {
    transition: transform .24s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  a.search-bar-button:hover i {
    transform: scaleX(0.8) scaleY(1.2);
  }
  a.search-bar-button i svg g g {
    transition: fill .24s ease-in-out;
  }
  a.search-bar-button:hover i svg g g {
    fill: #9EA7B4
  }
</style>
