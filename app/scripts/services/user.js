(function() {
    'use strict';

    angular
        .module('fbIonic')
        .service('UserService', Service);

    Service.$inject = ['$rootScope'];

    /* @ngInject */
    function Service($rootScope) {
      $rootScope.user = {}
      function func() {

      }

      function getAccessToken(){
        return $rootScope.user.accessToken;
      }

      function setAccessToken(accessToken){
        $rootScope.user.accessToken = accessToken;

      }

      this.getAccessToken = getAccessToken;
      this.setAccessToken = setAccessToken;

    }
})();