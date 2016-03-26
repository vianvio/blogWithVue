var appModel = require('./app.model.js');
var Vue = require('vue');
var Q = require('q');

module.exports = {
  GET_PASSAGE_TYPES: function() {
    var deferred = Q.defer();

    appModel.bLoading = true;
    Vue.http.get('/api/passageTypes').then(function(res) {
      appModel.bLoading = false;
      appModel.arrPassageTypes = res.data;

      deferred.resolve(res);
    }, function(error) {
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
      deferred.reject(error);
    });
    return deferred.promise;
  }
}
