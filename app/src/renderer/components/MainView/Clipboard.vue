<template>
  <div class="clipboard">
    <div class="search-bar">
      <input class="search-bar-input" autofocus autocomplete="off"
             type="text"
             name="search"
             placeholder="Type to search..."
             v-model.trim="searchWord"
             @focus="isSearchActive=!isSearchActive"
             @blur="isSearchActive=!isSearchActive"/>
      <Icon :isSearchActive="isSearchActive">
        <slot name="search"></slot>
        <slot name="search-outline"></slot>
      </Icon>
      <Icon :isFilterActive="isFilterActive" @click.native.prevent="isFilterActive=!isFilterActive">
        <slot name="filter"></slot>
        <slot name="filter-outline"></slot>
      </Icon>
    </div>

    <div class="contents">
      <ul>
        <Item v-for="(item, index) in filteredItems"
              @mouseover.native="indicate(index)"
              @dblclick.native="copy(item)">
          <p class="item-text"  v-if="!item.is_image" >{{ item.clipping }}</p>
          <p class="item-image" v-else :style="{ backgroundImage: `url(imgs/${imageURLHandler(item.clipping)})` }"></p>
        </Item>
      </ul>
      <div id="indicator" v-show="filteredItems.length"></div>
      <div id="extender" v-show="filteredItems.length">
        <div class="extends">
          <ul>
            <li><a class="extends-button" href="#">
              <i class="icon-like">
                <svg width="32px" height="32px" viewBox="233 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="icon-like-outline" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(233.000000, 0.000000)">
                    <g id="like-outline" transform="translate(7.000000, 9.000000)" fill="#657180">
                      <path d="M13.0209943,0 C11.4531932,0 9.75111932,0.699960227 8.90909091,2.1 C8.06710227,0.699960227 6.36498864,0 4.7971875,0 C2.05414205,0 0,1.71969318 0,4.60484659 C0,5.84925568 0.499625,7.46546023 1.62761932,8.80711364 C2.75553409,10.1488466 3.4265,10.8633636 5.61097727,12.3071136 C7.79545455,13.7509432 8.90909091,14 8.90909091,14 C8.90909091,14 10.0227273,13.7509432 12.2072045,12.3071136 C14.391642,10.8633636 15.0626477,10.1488466 16.1905625,8.80711364 C17.3185568,7.46546023 17.8181818,5.84925568 17.8181818,4.60484659 C17.8181818,1.71969318 15.7640398,0 13.0209943,0 L13.0209943,0 Z M15.7034659,8.39765341 C14.6354886,9.66799432 14.0258523,10.3423409 11.8562898,11.7762273 C10.2559545,12.8340227 9.26103977,13.220017 8.90905114,13.3366307 C8.5570625,13.2199773 7.5621875,12.8339432 5.9618125,11.7762273 C3.79228977,10.3423409 3.18265341,9.66803409 2.11463636,8.39761364 C1.63477841,7.82683523 1.24532386,7.15376136 0.988431818,6.45101705 C0.758147727,5.8209375 0.636363636,5.18254545 0.636363636,4.60484659 C0.636363636,3.40036932 1.03930114,2.39177273 1.80158523,1.68811364 C2.16510795,1.35255114 2.60332386,1.09184091 3.10422159,0.913181818 C3.61907955,0.729471591 4.18866477,0.636363636 4.7971875,0.636363636 C6.30926705,0.636363636 7.70922727,1.339625 8.36376705,2.42796591 L8.90909091,3.33470455 L9.45441477,2.42796591 C10.1089943,1.339625 11.5089545,0.636363636 13.0209943,0.636363636 C13.629517,0.636363636 14.1991023,0.729471591 14.7139602,0.913142045 C15.214858,1.09184091 15.6530739,1.35255114 16.0165966,1.68807386 C16.7788807,2.39177273 17.1818182,3.40036932 17.1818182,4.60484659 C17.1818182,5.18254545 17.0600341,5.8209375 16.8296705,6.45101705 C16.5728182,7.15372159 16.1833636,7.82683523 15.7034659,8.39765341 L15.7034659,8.39765341 Z" id="Shape"></path>
                    </g>
                  </g>
                </svg>
              </i>
            </a></li>
            <li><a class="extends-button" href="#">
              <i class="icon-delete">
                <svg width="32px" height="32px" viewBox="273 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="icon-delete" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(273.000000, 0.000000)">
                    <g id="delete" transform="translate(8.000000, 8.000000)" fill="#657180">
                      <g id="Group">
                        <path d="M13.6961538,2.34230769 C10.5730769,-0.780769231 5.50769231,-0.780769231 2.38076923,2.34230769 C-0.746153846,5.46538462 -0.742307692,10.5307692 2.38076923,13.6576923 C5.50384615,16.7807692 10.5692308,16.7807692 13.6961538,13.6576923 C16.8230769,10.5346154 16.8192308,5.46538462 13.6961538,2.34230769 L13.6961538,2.34230769 Z M13.2230769,13.1846154 C10.3653846,16.0423077 5.71153846,16.0423077 2.85384615,13.1846154 C-0.00384615385,10.3269231 -0.00384615385,5.67307692 2.85384615,2.81538462 C5.71153846,-0.0423076923 10.3653846,-0.0423076923 13.2230769,2.81538462 C16.0846154,5.67307692 16.0846154,10.3269231 13.2230769,13.1846154 L13.2230769,13.1846154 Z" id="Shape"></path>
                        <polygon id="Shape" points="11.2769231 4.30769231 8.03076923 7.54615385 4.8 4.32307692 4.34615385 4.77692308 7.57692308 8 4.34615385 11.2230769 4.8 11.6769231 8.03076923 8.45384615 11.2769231 11.6923077 11.7307692 11.2384615 8.48461538 8 11.7307692 4.76153846"></polygon>
                      </g>
                    </g>
                  </g>
                </svg>
              </i>
            </a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
  import fs from 'fs';
  import { clipboard, nativeImage } from 'electron';
  import store from './../../vuex/store';

  import Item from './Item';
  import Icon from './Icon';

  export default {
    store,
    data() {
      return {
        searchWord: '',
        visibility: 'all',
        isSearchActive: false,
        isFilterActive: false,
      };
    },
    props: {
      items: Array,
    },
    watch: {
    },
    computed: {
      _all() {
        return this.items;
      },
      _texts() {
        let txts = [];
        for (let item of this.items) {
          if (!item.is_image) {
            txts.push(item);
          }
        }
        return txts;
      },
      _images() {
        let imgs = [];
        for (let item of this.items) {
          if (item.is_image) {
            imgs.push(item);
          }
        }
        return imgs;
      },
      filteredItems() {
        let tmp = [];
        const regex = new RegExp(`${this.searchWord ? this.searchWord + '+' : ''}`, 'gi');
        for (let item of this[`_${this.isFilterActive ? 'images' : 'all'}`]) {
          if (regex.test(item.clipping)) {
            tmp.push(item);
          }
        }
        return tmp.reverse();
      },
    },
    filters: {
    },
    methods: {
      indicate: function(index) {
        document.querySelector('#indicator').style.top = `${48 * index}px`;
        document.querySelector('#extender').style.top = `${48 * index}px`;
      },
      copy(item) {
        if (item.is_image) {
          const img = nativeImage.createFromPath(item.clipping);
          console.log(item.clipping, img);
          clipboard.writeImage(img);
        } else {
          clipboard.writeText(item.clipping);
        }
      },
      imageURLHandler(imgURL) {
        const imgNameRegex = /\d{13}\.png$/g;
        const imgName = imgURL.match(imgNameRegex);
        return imgName;
      },
    },
    components: {
      Item,
      Icon,
    },
    name: 'clipboard',
  };
  /* eslint-enable */
</script>

<style scoped>
  .show { opacity: 1; }
  .hidden { opacity: 0; }

  .search-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 48px;
    background: #FFFFFF;
    z-index: 999;
  }

  input.search-bar-input {
    box-sizing: border-box;
    float: left;
    width: 304px;
    height: 32px;
    margin: 8px 0 8px 8px;
    padding: 0 0 0 32px;
    border: 0;
    border-radius: 4px;
    font: normal 16px/32px caption, "Myriad Pro", "Avenir Next", "Helvetica Neue", "Arial";
    color: #2B2F38;
    background: #F5F7F9;
    transition: background .24s ease-in-out;
  }
  input.search-bar-input::-webkit-input-placeholder {
    color: #C3CBD6;
    transition: color .24s ease-in-out;
  }
  input.search-bar-input:focus {
    background: #FFFFFF;
  }
  input.search-bar-input:focus::-webkit-input-placeholder {
    color: #D7DDE4;
  }

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

  #indicator,
  #extender {
    position: absolute;
    top: 0px;
    right: 8px;
    height: 48px;
    border-radius: 4px;
    transition: top .24s ease;
  }
  #indicator {
    width: 344px;
    background-color: #F5F7F9;
    z-index: -1;
  }
  #extender {
    width: auto;
    z-index: 999;
  }
  .extends,
  .extends ul {
    position: absolute;
    right: 0;
    top: 0;
    width: 64px;
    height: 48px;
  }
  .extends {
    float: right;
    background: rgba(245,247,249,0.9);
    border-radius: 4px;
    overflow: hidden;
  }
  .extends ul {
    float: left;
  }

  .extends ul li {
    float: left;
  }
  .extends ul li a,
  .extends ul li a i {
    float: left;
    width: 32px;
    height: 32px;
  }
  .extends ul li a {
    margin: 8px 0;
  }
</style>
