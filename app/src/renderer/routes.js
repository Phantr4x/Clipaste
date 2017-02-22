export default [
  {
    path: '/',
    name: 'main',
    component: require('components/MainView'),
  },
  {
    path: '/preferences',
    name: 'preferences',
    component: require('components/PreferencesView'),
  },
  {
    path: '*',
    redirect: '/',
  },
];
