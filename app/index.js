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
var Login = require('./components/Login/Login.vue');
var PassageList = require('./components/Passage/PassageList.vue');
var PassageDetail = require('./components/Passage/PassageDetail.vue');
var ManagePage = require('./components/Manage/ManagePage.vue');
var PassageEdit = require('./components/Manage/Passage/PassageEdit.vue');
var SystemConfig = require('./components/SystemConfig/SystemConfig.vue');
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
  '/passages/:passageId': {
    component: PassageDetail
  },
  '/manage': {
    component: ManagePage,
    subRoutes: {
      '/passage': {
        component: PassageList
      },
      '/systemConfig': {
        component: SystemConfig
      },
      '/newPassage': {
        component: PassageEdit
      },
      '/editPassage': {
        component: PassageEdit
      }
    }
  }
});

router.beforeEach(function() {
  window.scrollTo(0, 0);
});

router.afterEach(function(transition) {
  if (transition.to.path === '/login') {
    appModel.bLoginPage = true;
  } else {
    appModel.bLoginPage = false;
  }
})

router.redirect({
  '*': '/login'
});

router.start(App, '#app');

window.addEventListener('scroll', function() {
  var top = document.body.scrollTop
  var headerHeight = document.querySelector('.nav-holder').offsetHeight;
  if (top > headerHeight) {
    document.querySelector('.side-bar').classList.add('side-bar-fix');
  } else {
    document.querySelector('.side-bar').classList.remove('side-bar-fix');
  }
})
