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
var PassageEdit = require('./components/Passage/PassageEdit.vue');
var SystemConfig = require('./components/SystemConfig/SystemConfig.vue');
var EditResume = require('./components/Resume/EditResume.vue');
var ResumeList = require('./components/Resume/ResumeList.vue');
var Resume = require('./components/Resume/Resume.vue');
var BabyRecordList = require('./components/BabyRecord/BabyRecordList.vue');
var EditBabyRecord = require('./components/BabyRecord/EditBabyRecord.vue');
var BabyRecordDetail = require('./components/BabyRecord/BabyRecordDetail.vue');
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
  '/resume/:resumeId':{
    component: Resume
  },
  '/babyRecords':{
    component: BabyRecordDetail
  },
  '/manage': {
    component: ManagePage,
    subRoutes: {
      '/systemConfig': {
        component: SystemConfig
      },
      '/passageList': {
        component: PassageList
      },
      '/newPassage': {
        component: PassageEdit
      },
      '/editPassage/:passageId': {
        component: PassageEdit
      },
      '/resumeList': {
        component: ResumeList
      },
      '/editResume/:resumeId': {
        component: EditResume
      },
      '/newResume': {
        component: EditResume
      },
      '/recordList': {
        component: BabyRecordList
      },
      '/editRecord/:recordId': {
        component: EditBabyRecord
      },
      '/newRecord': {
        component: EditBabyRecord
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
  '*': '/passages'
});

router.start(App, '#app');

// keep login when refresh
Vue.http.headers.common['Authorization'] = sessionStorage.getItem('token');

window.addEventListener('scroll', function() {
  appModel.css.bodyScroll = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  var top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
  var headerHeight = document.querySelector('.nav-holder').offsetHeight;
  if (top > headerHeight) {
    document.querySelector('.side-bar').classList.add('side-bar-fix');
  } else {
    document.querySelector('.side-bar').classList.remove('side-bar-fix');
  }
})
