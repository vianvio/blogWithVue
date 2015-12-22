webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	// require("font-awesome-webpack");

	var Vue = __webpack_require__(19);
	var Router = __webpack_require__(21);
	var App = __webpack_require__(22);

	// import NewsView from './components/NewsView.vue'
	// import ItemView from './components/ItemView.vue'
	// import UserView from './components/UserView.vue'
	// install router
	Vue.use(Router);

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
	//   '*': '/news/1'
	// });

	router.start(App, '#app');


/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23)
	module.exports = __webpack_require__(24)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(26)
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/vshen008/Documents/Projects/blogWithVue/app/components/App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
	  }
	})()}

/***/ },

/***/ 23:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// <template>
	// <navBar></navBar>
	// <h2>hello with font-awesome</h2>
	// <i class='fa fa-plus-circle'></i>
	// 	<router-view></router-view>
	// </template>

	// <script>
	var sub = __webpack_require__(25);
	sub.generateText();
	// </script>

	// <style lang="sass">
	// @import "../shared/variables.scss";

	// h2 {
	//   color: $red;
	// }

	// </style>

/***/ },

/***/ 25:
/***/ function(module, exports) {

	//我们这里使用CommonJS的风格
	function generateText() {
	  console.log('test');
	}

	module.exports = {
	  'generateText': generateText
	};


/***/ },

/***/ 26:
/***/ function(module, exports) {

	module.exports = "<navBar></navBar>\n<h2>hello with font-awesome</h2>\n<i class='fa fa-plus-circle'></i>\n\t<router-view></router-view>";

/***/ }

});