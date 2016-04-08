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

      appModel.newPassage.id = res.data.id;
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
  },
  GET_EDUCATION_BY_ID: function(educationId) {
    var deferred = Q.defer();

    appModel.bLoading = true;
    Vue.http.get('/api/educations/' + educationId + '?filter[where][resumeId]=' + appModel.newResume.id).then(function(res) {
      appModel.bLoading = false;

      appModel.newEducation.id = res.data.id;
      appModel.newEducation.from = res.data.from;
      appModel.newEducation.to = res.data.to;
      appModel.newEducation.name = res.data.name;
      appModel.newEducation.major = res.data.major;
      appModel.newEducation.description = res.data.description;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_EDUCATION_LIST: function(bWithLoading) {
    var deferred = Q.defer();

    appModel.bLoading = bWithLoading ? true : appModel.bLoading;
    appModel.arrEducation = [];
    Vue.http.get('/api/educations?filter[where][resumeId]=' + appModel.newResume.id).then(function(res) {
      appModel.bLoading = bWithLoading ? false : appModel.bLoading;

      appModel.arrEducation = res.data;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_RESUME_LIST: function() {
    var deferred = Q.defer();

    appModel.bLoading = true;
    Vue.http.get('/api/resumes').then(function(res) {
      appModel.bLoading = false;

      appModel.arrResume = res.data;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_RESUME_BY_ID: function(resumeId, bWithLoading) {
    var deferred = Q.defer();

    appModel.bLoading = bWithLoading ? true : appModel.bLoading;
    Vue.http.get('/api/resumes/' + resumeId).then(function(res) {
      appModel.bLoading = bWithLoading ? false : appModel.bLoading;

      appModel.newResume.id = res.data.id;
      appModel.newResume.title = res.data.title;
      appModel.newResume.name = res.data.name;
      appModel.newResume.birthday = res.data.birthday;
      appModel.newResume.phone = res.data.phone;
      appModel.newResume.email = res.data.email;
      appModel.newResume.wechat = res.data.wechat;
      appModel.newResume.qq = res.data.qq;
      appModel.newResume.selfAssignment = res.data.selfAssignment;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_JOB_BY_ID: function(jobId) {
    var deferred = Q.defer();

    appModel.bLoading = true;
    Vue.http.get('/api/jobs/' + jobId + '?filter[where][resumeId]=' + appModel.newResume.id).then(function(res) {
      appModel.bLoading = false;

      appModel.newJob.id = res.data.id;
      appModel.newJob.from = res.data.from;
      appModel.newJob.to = res.data.to;
      appModel.newJob.name = res.data.name;
      appModel.newJob.title = res.data.title;
      appModel.newJob.description = res.data.description;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_JOB_LIST: function(bWithLoading) {
    var deferred = Q.defer();

    appModel.bLoading = bWithLoading ? true : appModel.bLoading;
    appModel.arrJob = [];
    Vue.http.get('/api/jobs?filter[where][resumeId]=' + appModel.newResume.id).then(function(res) {
      appModel.bLoading = bWithLoading ? false : appModel.bLoading;
      
      appModel.arrJob = res.data;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_PROJECT_BY_ID: function(jobId) {
    var deferred = Q.defer();

    appModel.bLoading = true;
    Vue.http.get('/api/projects/' + jobId + '?filter[where][resumeId]=' + appModel.newResume.id).then(function(res) {
      appModel.bLoading = false;

      appModel.newProject.id = res.data.id;
      appModel.newProject.from = res.data.from;
      appModel.newProject.to = res.data.to;
      appModel.newProject.name = res.data.name;
      appModel.newProject.technology = res.data.technology;
      appModel.newProject.description = res.data.description;
      appModel.newProject.responsibility = res.data.responsibility;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_PROJECT_LIST: function(bWithLoading) {
    var deferred = Q.defer();

    appModel.bLoading = bWithLoading ? true : appModel.bLoading;
    appModel.arrProject = [];
    Vue.http.get('/api/projects?filter[where][resumeId]=' + appModel.newResume.id).then(function(res) {
      appModel.bLoading = bWithLoading ? false : appModel.bLoading;
      
      appModel.arrProject = res.data;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_RECORD_BY_ID: function(recordId) {
    var deferred = Q.defer();

    appModel.bLoading = true;
    Vue.http.get('/api/records/' + recordId).then(function(res) {
      appModel.bLoading = false;

      appModel.newRecord.id = res.data.id;
      appModel.newRecord.content = res.data.content;
      appModel.newRecord.eventDate = res.data.eventDate;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_RECORD_LIST: function() {
    var deferred = Q.defer();

    appModel.bLoading = true
    appModel.arrRecord = [];
    Vue.http.get('/api/records').then(function(res) {
      appModel.bLoading = false
      
      appModel.arrRecord = res.data;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  },
  GET_IMAGE_LIST: function(recordId) {
    var deferred = Q.defer();

    appModel.bLoading = true
    appModel.arrRecordImage = [];
    Vue.http.get('/api/recordImages?filter[where][recordId]=' + recordId).then(function(res) {
      appModel.bLoading = false
      
      appModel.arrRecordImage = res.data;

      deferred.resolve(res);
    }, function(error) {
      _checkAuth(error, this);
      deferred.reject(error);
    });
    return deferred.promise;
  }
}
