angular.module('starter.services', [])
.factory('Questions', function($http) {
  return {
    all: function() {
      return $http({
        url: 'http://localhost:3000/api/v1/Questions',
        method: 'GET'
      });
    },
    get: function(questionId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Questions/'+questionId,
        method: 'GET'
      });
    }
  };
})

.factory('Answers', function($http) {
  return {
    get: function(questionId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Answers/?questionId='+questionId,
        method: 'GET'
      });
    }
  };
})

.factory('Recommendations', function($http) {
  return {
    get: function(recoId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Recommendations/'+recoId,
        method: 'GET'
      });
    }
  };
})

.factory('Products', function($http) {
  return {
    get: function(productId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Products/'+productId,
        method: 'GET'
      });
    },
    getReviews: function(productId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Reviews/?productId='+productId,
        method: 'GET'
      });
    },
    getFaq: function(productId) {
      return $http({
        url: 'http://localhost:3000/api/v1/Faqs/?productId='+productId,
        method: 'GET'
      });
    }
  };
})

.factory('Waitlist', function($http){
  return{
    addUser: function(user){
      return $http({
        url: 'http://localhost:3000/queue/addUser',
        method: 'POST',
        data: {'user': user}
      });
    },
    updateUser: function(user){
      return $http({
        url: 'http://localhost:3000/queue/updateUser',
        method: 'POST',
        data: {'user': user}
      });
    }
  };
});