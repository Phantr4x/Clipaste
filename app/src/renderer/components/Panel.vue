<template>
  <div class="panel">
    <div class="filters">
      <input
        autofocus
        autocomplete="off"
        class="filters-input"
        type="text"
        placeholder="Type to search..."
        v-model.trim="input" />
      <label class="filters-switch">
        <input
          type="checkbox"
          v-model.trim="imageOnly" />
        <div class="filters-switch-slider">
          <i class="material-icons">image</i>
        </div>
      </label>
    </div>
    <div class="contents">
      <ul>
        <li
          class="item"
          v-for="(item, index) in result"
          @dblclick.capture="duplicate(item)"
          :class="item.star ? 'asterisk': ''">
          <p
            class="item-text"
            v-if="item.text">
            {{ item.text }}
          </p>
          <p
            class="item-image"
            v-if="item.image">
            <img :src="imageGenerator(item.image)" :alt="item.id" />
          </p>
          <div class="item-extends">
            <button
              type="button"
              name="star"
              @click.stop="asterisk(item)">
              <i class="material-icons">star</i>
            </button>
            <button
              type="button"
              name="delete"
              @click.stop="deprecate(item)">
              <i class="material-icons">delete</i>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import { ipcRenderer, clipboard, nativeImage } from 'electron';
  import Fuse from 'fuse.js';

  // import toast from 'native-toast';

  export default {
    name: 'panel',
    data() {
      return {
        input: '',
        imageOnly: false,
      };
    },
    computed: {
      result() {
        const source = this.$store.state.source.storage;
        let result = [
          ...source.filter(item => item.star).sort((a, b) => b.id - a.id),
          ...source.filter(item => !item.star).sort((a, b) => b.id - a.id),
        ];

        if (this.imageOnly) {
          result = result.filter(item => item.image);
        }

        if (this.input) {
          const fuse = new Fuse(result, {
            keys: ['text'],
            tokenize: true,
            shouldSort: true,
          });
          result = fuse.search(this.input).slice(0, 20);
        }
        return result;
      },
    },

    methods: {
      duplicate(item) {
        console.time('Duplicate');
        if (item.text) {
          clipboard.writeText(item.text);
        }
        if (item.image) {
          clipboard.writeImage(nativeImage.createFromPath(item.image));
        }
        console.timeEnd('Duplicate');
      },
      asterisk(item) {
        console.time('Asterisk');
        this.$store.commit('CHANGE_STAR_STATUS', item.id);
        console.timeEnd('Asterisk');
      },
      deprecate(item) {
        console.time('Deprecate');
        if (item.text) {
          this.$store.commit('DELETE_TEXT_CONTENT', item.id);
        }
        if (item.image) {
          ipcRenderer.send('image-delete', item.id);
          this.$store.commit('DELETE_IMAGE_CONTENT', item.id);
        }
        console.timeEnd('Deprecate');

        console.time('[ContentSync]');
        ipcRenderer.send('content-sync', JSON.stringify(this.$store.state.source.storage));
        console.timeEnd('[ContentSync]');
      },
      imageGenerator(imgURL) {
        console.time('ImageGenerate');
        const img = nativeImage.createFromPath(imgURL)
          .resize({ quality: 'good' })
          .crop({ x: 0, y: 0, width: 360, height: 48 })
          .toDataURL();
        console.timeEnd('ImageGenerate');
        return img;
      },
    },
  };
</script>

<!-- <style src="components/assets/native-toast.css"></style> -->
<!-- <style src="components/assets/animation.css"></style> -->
<style scoped>
.filters {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 48px;
  padding: 0 8px;
  background: #1D1B1D;
  border-bottom: 1px solid #100F10;
  z-index: 999;
}

/* Input */
.filters-input {
  box-sizing: border-box;
  width: 288px;
  height: 32px;
  margin: 8px 0;
  padding: 0 8px;
  border-top: 1px solid #171517;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #2D2B2D;
  background: #161416;
  font: normal 14px/32px "PT Mono", Monospace, "Source Han Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #FFFFFF;
  border-radius: 4px;
}
.filters-input::-webkit-input-placeholder {
  color: #343234;
}

/* Switch */
.filters-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  margin: 12px 0;
  float: right;
}
.filters-switch input { display: none; }

.filters-switch i.material-icons {
  margin: 4px 0;
  font-size: 16px;
}

.filters-switch-slider {
  box-sizing: border-box;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 24px;
  padding: 0 5px;
  border-top: 1px solid #171517;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #2D2B2D;
  border-radius: 32px;
  font: normal 14px/24px Lato, 'Helvetica Neue', Helvetica, PingFang SC, Microsoft Jhenghei, Microsoft YaHei, Arial, sans-serif;
  color: #161416;
  background-color: #1D1B1D;
  overflow: hidden;
  transition: transform .2s cubic-bezier(.645,.045,.355,1);
}

.filters-switch-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 2px;
  border-radius: 50%;
  background-color: #383638;
  transition: transform .2s cubic-bezier(.645,.045,.355,1);
}

.filters-switch input:checked + .filters-switch-slider {
  color: #FFFFFF;
  background-color: #161416;
}

.filters-switch input:focus + .filters-switch-slider {
  box-shadow: 0 0 1px #161416;
}

.filters-switch input:checked + .filters-switch-slider:before {
  background-color: #22C7FC;
  transform: translateX(24px);
}

/* Content */
.contents {
  box-sizing: border-box;
  position: relative;
  width: 360px;
  height: 480px;
  transform: translateY(48px);
  background: #272527;
  overflow-y: auto;
}

li.item {
  box-sizing: border-box;
  position: relative;
  border-top: 1px solid #272527;
  border-bottom: 1px solid #272527;
  background: #272527;
  overflow: hidden;
  transition: background .2s cubic-bezier(.645,.045,.355,1);
}
li.item:hover {
  border-top: 1px solid #161416;
  border-bottom: 1px solid #2D2B2D;
  background: #161416;
}

p.item-text {
  margin: 8px 16px;
  padding-bottom: 1px;
  font: normal 14px/1.4 Andale Mono, PT Mono, 'Helvetica Neue', Helvetica, PingFang SC, Microsoft Jhenghei, Microsoft YaHei, Arial, sans-serif;
  color: #FFFFFF;
}

p.item-image {
  height: 48px;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}
p.item-image img {
  height: 100%;
}

.item-extends {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  opacity: 0;
  transition: opacity .2s cubic-bezier(.645,.045,.355,1);
}

.item-extends button {
  float: left;
  border: none;
  width: 36px;
  height: 100%;
  background-color: rgba(22,20,22,0.9);
  color: #FFFFFF;
  cursor: pointer;
  transition: color .2s cubic-bezier(.645,.045,.355,1);
}

.item-extends button i {
  font-size: 18px;
  cursor: pointer;
}

.item-extends button:hover {
  color: #22C7FC;
}

li.item:hover .item-extends {
  opacity: 1;
}

.asterisk {
  border-left: 3px solid #22C7FC;
}
</style>
