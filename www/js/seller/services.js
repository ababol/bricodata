// var url = "http://192.168.43.118:3000";
var url = "http://oqadu.herokuapp.com:3000";

angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('Products', function($http) {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  // var products = [
  //     {id:0,name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
  //     {id:1,name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
  //     {id:2,name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
  //     {id:3,name:"Product cyril", description:"bla bla bla bla bla bla bla bla bla"},
  //     {id:4,name:"Product eric2", description:"bla bla bla bla bla bla bla bla bla"},
  //     {id:5,name:"Product eric", description:"bla bla bla bla bla bla bla bla bla"},
  //     {id:6,name:"Product eric23", description:"bla bla bla bla bla bla bla bla bla"},
  //     {id:7,name:"Product", description:"bla bla bla bla bla bla bla bla bla"},
  //     {id:8,name:"Product", description:"bla bla bla bla bla bla bla bla bla"}
  //   ];

  return {
    all: function() {
      return $http({
        url: url+'/api/v1/Products/',
        method: 'GET'
      });
    },
    get: function(productId) {
      return $http({
        url: url+'/api/v1/Products/'+productId,
        method: 'GET'
      });
    },
    getReviews: function(productId) {
      return $http({
        url: url+'/api/v1/Reviews/?productId='+productId,
        method: 'GET'
      });
    },
    getFaq: function(productId) {
      return $http({
        url: url+'/api/v1/Faqs/?productId='+productId,
        method: 'GET'
      });
    }
  }
})

.factory('Tags', function() {
  // Might use a resource here that returns a JSON array
  // Some fake testing data
  var tags = [
    {name:"Tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag"},
    {name:"Tag tag"},
    {name:"Tag tag tag tag"},
    {name:"Tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag tag tag"},
    {name:"Tag tag tag"},
    {name:"Tag tag"}
  ];

  return {
    all: function() {
      return tags;
    }
  }
})

.factory('Waitlist', function($http){
  return{
    getSize: function(){
      return $http({
        url: url+'/queue/size',
        method: 'GET'
      });
    },
    next: function(){
      return $http({
        url: url+'/queue/next',
        method: 'GET'
      });
    },
    prev: function(){
      return $http({
        url: url+'/queue/prev',
        method: 'GET'
      });
    },
    current: function(){
      return $http({
        url: url+'/queue/current',
        method: 'GET'
      });
    },
    updateUser: function(user){
      return $http({
        url: url+'/queue/updateUser',
        method: 'POST',
        data: {'user': user}
      });
    }
  };
});
