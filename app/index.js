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
var ManagePage = require('./components/ManagePage.vue');
var PassageEdit = require('./components/PassageEdit.vue');

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
  },
  '/manage': {
    component: ManagePage,
    subRoutes: {
      '/passage': {
        component: PassageEdit
      }
    }
  }
});

router.beforeEach(function() {
  window.scrollTo(0, 0);
});

router.redirect({
  '*': '/login'
});

router.start(App, '#app');
