require('./index.scss');

var Vue = require('vue');
var Router = require('vue-router');
var Resource = require('vue-resource');
// install router
Vue.use(Router);
Vue.use(Resource);

// components
var App = require('./components/App.vue');
var Login = require('./components/Login.vue');
var PassageList = require('./components/PassageList.vue');

// register filters globally
// Vue.filter('fromNow', fromNow);
// Vue.filter('domain', domain);

// routing
var router = new Router();

router.map({
  '/login': {
    component: Login
  },
  '/passages': {
  	component: PassageList
  }
});

router.beforeEach(function() {
  window.scrollTo(0, 0);
});

// router.redirect({
//   '*': '/'
// });

router.start(App, '#app');
