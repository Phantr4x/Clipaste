import Vue from 'vue';

import App from './App';

Vue.config.debug = true;

/* eslint-disable no-new */
new Vue({
  ...App,
}).$mount('#app');
// new Vue({
//   el: '#app',
//   render: h => h(App),
// });
