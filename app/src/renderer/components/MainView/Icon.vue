<template>
  <span class="icons">
    <slot v-if="isFilterActive" name="filter">
      <a href="#" class="button filter">
        <i class="icon-filter">
          <svg width="32px" height="32px" viewBox="32 32 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icon-filter" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(32.000000, 32.000000)">
              <g id="filter" transform="translate(7.000000, 7.000000)" fill="#2B2F38">
                <g id="Group">
                  <polygon id="Shape" points="6.49535567 4.51020619 4.91604124 6.09295361 16.7967835 18 18.371134 16.4172526"></polygon>
                  <rect id="Rectangle-path" x="5.75257732" y="0" width="1.48453608" height="2.96907216"></rect>
                  <rect id="Rectangle-path" x="5.75257732" y="9.46391753" width="1.48453608" height="2.96907216"></rect>
                  <rect id="Rectangle-path" x="10.0206186" y="5.3814433" width="2.96907216" height="1.48453608"></rect>
                  <polygon id="Shape" points="11.409634 2.32622165 10.3599278 1.27414948 8.26051546 3.37824742 9.31022165 4.43031959"></polygon>
                  <polygon id="Shape" points="1.58010309 2.32622165 3.67951546 4.43031959 4.72922165 3.37824742 2.62980928 1.27414948"></polygon>
                  <polygon id="Shape" points="1.58010309 10.0735515 2.62980928 11.1254845 4.72922165 9.02143299 3.67951546 7.96936082"></polygon>
                  <rect id="Rectangle-path" x="0" y="5.3814433" width="2.96907216" height="1.48453608"></rect>
                </g>
              </g>
            </g>
          </svg>
        </i>
      </a>
    </slot>
    <slot v-if="!isFilterActive" name="filter-outline">
      <a href="#" class="button filter">
        <i class="icon-filter-outline">
          <svg width="32px" height="32px" viewBox="32 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icon-filter-outline" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(32.000000, 0.000000)">
              <g id="filter-outline" transform="translate(7.000000, 7.000000)">
                <g id="Group">
                  <path d="M6.18234943,4.10079255 L4.53822727,5.73041489 L16.9065483,17.9903298 L18.5454545,16.3607074 L6.18234943,4.10079255 L6.18234943,4.10079255 Z M7.17651136,7.26232979 L7.72780398,6.71591489 L17.4577926,16.3607074 L16.9065483,16.9071223 L7.17651136,7.26232979 L7.17651136,7.26232979 Z" id="Shape" fill="#000000"></path>
                  <rect id="Rectangle-path" fill="#2B2F38" x="5.79545455" y="0" width="0.772727273" height="1.91489362"></rect>
                  <rect id="Rectangle-path" fill="#2B2F38" x="5.79545455" y="9.76595745" width="0.772727273" height="1.91489362"></rect>
                  <rect id="Rectangle-path" fill="#2B2F38" x="10.4318182" y="5.36170213" width="1.93181818" height="0.765957447"></rect>
                  <rect id="Rectangle-path" fill="#2B2F38" x="0" y="5.36170213" width="1.93181818" height="0.765957447"></rect>
                  <rect id="Rectangle-path" fill="#2B2F38" transform="translate(2.698578, 2.397120) rotate(135.000000) translate(-2.698578, -2.397120) " x="2.31221818" y="1.43968201" width="0.772719862" height="1.91487525"></rect>
                  <rect id="Rectangle-path" fill="#2B2F38" transform="translate(2.698504, 9.303020) rotate(225.000000) translate(-2.698504, -9.303020) " x="2.31219216" y="8.34558274" width="0.772623272" height="1.91487525"></rect>
                  <rect id="Rectangle-path" fill="#2B2F38" transform="translate(9.665176, 2.397400) rotate(225.000000) translate(-9.665176, -2.397400) " x="9.27881614" y="1.43998583" width="0.772719862" height="1.91482738"></rect>
                </g>
              </g>
            </g>
          </svg>
        </i>
      </a>
    </slot>
    <slot v-if="isSearchActive" name="search">
      <a href="#" class="button search">
        <i class="icon-search">
          <svg width="32px" height="32px" viewBox="0 32 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icon-search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(0.000000, 32.000000)">
              <g id="search" transform="translate(7.000000, 7.000000)" fill="#2B2F38">
                <path d="M13.1484375,10.96875 C13.8515625,9.8625 14.2640625,8.55 14.2640625,7.1390625 C14.2640625,3.196875 11.071875,0 7.134375,0 C3.1921875,0 0,3.196875 0,7.1390625 C0,11.08125 3.1921875,14.278125 7.1296875,14.278125 C8.559375,14.278125 9.890625,13.85625 11.00625,13.134375 L11.3296875,12.909375 L16.4203125,18 L18,16.3921875 L12.9140625,11.3015625 L13.1484375,10.96875 L13.1484375,10.96875 Z M11.128125,3.15 C12.1921875,4.2140625 12.778125,5.6296875 12.778125,7.134375 C12.778125,8.6390625 12.1921875,10.0546875 11.128125,11.11875 C10.0640625,12.1828125 8.6484375,12.76875 7.14375,12.76875 C5.6390625,12.76875 4.2234375,12.1828125 3.159375,11.11875 C2.0953125,10.0546875 1.509375,8.6390625 1.509375,7.134375 C1.509375,5.6296875 2.0953125,4.2140625 3.159375,3.15 C4.2234375,2.0859375 5.6390625,1.5 7.14375,1.5 C8.6484375,1.5 10.0640625,2.0859375 11.128125,3.15 L11.128125,3.15 Z" id="Shape"></path>
              </g>
            </g>
          </svg>
        </i>
      </a>
    </slot>
    <slot v-if="!isSearchActive" name="search-outline">
      <a href="#" class="button search">
        <i class="icon-search-outline">
          <svg width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="icon-search-outline" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="search-outline" transform="translate(7.000000, 7.000000)" fill="#2B2F38">
                <path d="M17.9672727,16.9078125 L12.6701299,11.5921875 C13.6425974,10.3734375 14.227013,8.821875 14.227013,7.134375 C14.227013,3.1921875 11.0431169,0 7.12051948,0 C3.19324675,0 0.014025974,3.196875 0.014025974,7.134375 C0.014025974,11.071875 3.19792208,14.26875 7.12051948,14.26875 C8.81298701,14.26875 10.3651948,13.6734375 11.5854545,12.684375 L16.8779221,18 L17.9672727,16.9078125 L17.9672727,16.9078125 Z M2.62285714,11.653125 C1.4212987,10.4484375 0.762077922,8.8453125 0.762077922,7.1390625 C0.762077922,5.4328125 1.42597403,3.8296875 2.62285714,2.625 C3.81974026,1.4203125 5.42337662,0.75 7.12051948,0.75 C8.81766234,0.75 10.4166234,1.415625 11.6181818,2.6203125 C12.8197403,3.825 13.478961,5.428125 13.478961,7.134375 C13.478961,8.840625 12.8150649,10.44375 11.6181818,11.6484375 C10.4166234,12.853125 8.81766234,13.51875 7.12051948,13.51875 C5.42337662,13.5234375 3.82441558,12.8578125 2.62285714,11.653125 L2.62285714,11.653125 Z" id="Shape"></path>
              </g>
            </g>
          </svg>
        </i>
      </a>
    </slot>
  </span>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props: {
      isFilterActive: Boolean,
      isSearchActive: Boolean,
    },
  };
</script>

<style scoped>
  .button {
    display: inline-block;
    float: left;
  }
  a.filter {
    position: absolute;
    width: 32px;
    height: 32px;
    margin: 8px;
  }
  a.search {
    position: absolute;
    top: 0;
    left: 0;
  }
  i.icon-search, i.icon-search-outline {
    position: absolute;
    width: 32px;
    height: 32px;
    margin: 8px 0 8px 8px;
  }
  i.icon-filter, i.icon-filter-outline {
    position: absolute;
    width: 32px;
    height: 32px;
    transition: transform .24s cubic-bezier(0.23, 1, 0.32, 1);
  }
  a.button:hover i.icon-filter {
    transform: rotate(30deg);
  }
</style>
