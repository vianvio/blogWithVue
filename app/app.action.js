var appModel = require('./app.model.js');
var Vue = require('vue');
var Q = require('q');

var _checkAuth = function(error, that) {
  if (error.status === 401) {
    that.$route.router.go('/login');
  }
};

module.exports = {
  GET_PASSAGE_TYPES: function() {
    var deferred = Q.defer();

    appModel.bLoading = true;
    Vue.http.get('/api/passageTypes').then(function(res) {
      appModel.bLoading = false;
      appModel.arrPassageTypes = res.data;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_PASSAGE_LIST: function() {
    var deferred = Q.defer();
    appModel.bLoading = true;
    Vue.http.get('/api/passages').then(function(res) {
      appModel.bLoading = false;
      appModel.arrPassages = res.data;
      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_PASSAGE_LIST_BY_TYPE: function(typeId) {
    var deferred = Q.defer();

    appModel.bLoading = true;
    Vue.http.get('/api/passages?filter[where][passageTypeId]=' + typeId).then(function(res) {
      appModel.bLoading = false;
      appModel.arrPassages = res.data;
      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_PASSAGE_BY_ID: function(passageId) {
    var deferred = Q.defer();

    appModel.bLoading = true;
    Vue.http.get('/api/passages/' + passageId + '?filter[include]=passageType').then(function(res) {
      appModel.bLoading = false;
      console.log(res);

      appModel.newPassage.title = res.data.title;
      appModel.newPassage.tag = res.data.tag;
      appModel.newPassage.content = res.data.content;
      appModel.newPassage.passageTypeId = res.data.passageTypeId;
      appModel.passageRelatedInfo.createdAt = res.data.createdAt;
      appModel.passageRelatedInfo.updatedAt = res.data.updatedAt;
      appModel.passageRelatedInfo.passageType = res.data.passageType.name;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  }
}
