require('./index.scss');
require('../node_modules/bootstrap/dist/css/bootstrap.css');

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
var SystemConfig = require('./components/SystemConfig.vue');
var appModel = require('./app.model.js');

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
      },
      '/systemConfig': {
        component: SystemConfig
      }
    }
  }
});

router.beforeEach(function() {
  window.scrollTo(0, 0);
});

router.afterEach(function (transition) {
  if(transition.to.path === '/login') {
    appModel.bLoginPage = true;
  } else {
    appModel.bLoginPage = false;
  }
})

router.redirect({
  '*': '/login'
});

router.start(App, '#app');
