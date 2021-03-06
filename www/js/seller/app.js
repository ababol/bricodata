// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.backgroundColorByHexString('#4A87EE');
      ionic.Platform.fullScreen(true, true);
    }

    if (window.Connection) {
      if (navigator.connection.type == Connection.NONE) {
        $ionicPopup.show({
          title: "Connexion Internet Requise",
          content: "Une connexion internet est requise afin que l'application puisse fonctionner.",
          buttons: [
            {
              text: 'Cancel',
              onTap: function(e) {
                ionic.Platform.exitApp();
                if (navigator.connection.type == Connection.NONE) {
                  //don't allow the user to close unless he has a connection
                  e.preventDefault();
                }
              }
            },
            {
              text: '<b>Ok</b>',
              type: 'button-positive',
              onTap: function(e) {
                if (navigator.connection.type == Connection.NONE) {
                  //don't allow the user to close unless he has a connection
                  e.preventDefault();
                }
              }
            }
          ]
        });
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      controller: 'CustomerCtrl',
      templateUrl: "templates/seller/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.user', {
      url: '/user',
      views: {
        'tab-user': {
          templateUrl: 'templates/seller/tab-user.html',
          controller: 'UserCtrl'
        }
      }
    })

    .state('tab.scan', {
      url: '/scan',
      views: {
        'tab-scan': {
          controller: 'ScanCtrl'
        }
      }
    })

    .state('tab.product', {
      url: '/product',
      views: {
        'tab-product': {
          templateUrl: 'templates/seller/tab-product.html',
          controller: 'ProductCtrl'
        }
      }
    })
    .state('tab.product-detail', {
      url: '/product-detail/:productId',
      backUrl: '/tab/product',
      views: {
        'tab-product': {
          templateUrl: 'templates/seller/product-detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })

    .state('tab.tag', {
      url: '/tag',
      views: {
        'tab-tag': {
          templateUrl: 'templates/seller/tab-tag.html',
          controller: 'TagCtrl'
        }
      }
    })

    .state('tab.cart', {
      url: '/cart',
      views: {
        'tab-cart': {
          templateUrl: 'templates/seller/tab-cart.html',
          controller: 'CartCtrl'
        }
      }
    })

    .state('waitlist', {
      url: '/waitlist',
      templateUrl: 'templates/seller/waitlist.html',
      controller: 'WaitlistCtrl'
    })

    .state('products', {
      url: '/products',
      templateUrl: 'templates/seller/products.html',
      controller: 'AllProductsCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/seller/login.html',
      controller: 'LoginCtrl'
    })

    .state('product-detail', {
      url: '/product-detail/:productId',
      templateUrl: 'templates/seller/product-detail.html',
      controller: 'ProductDetailCtrl'
    });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');

});
