require('./index.scss');

var Vue = require('vue');
var Router = require('vue-router');
var Resource = require('vue-resource');
// install router
Vue.use(Router);
Vue.use(Resource);

// components
var App = require('./components/App.vue');

// register filters globally
// Vue.filter('fromNow', fromNow);
// Vue.filter('domain', domain);

// routing
var router = new Router();

// router.map({
//   '/news/:page': {
//     component: NewsView
//   },
//   '/user/:id': {
//     component: UserView
//   },
//   '/item/:id': {
//     component: ItemView
//   }
// });

// router.beforeEach(function () {
//   window.scrollTo(0, 0)
// })

// router.redirect({
//   '*': '/'
// });

router.start(App, '#app');
