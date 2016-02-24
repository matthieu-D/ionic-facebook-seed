(function() {
    'use strict';

    angular
        .module('fbIonic')
        .controller('HomeCtrl', Controller);

    Controller.$inject = ['UserService', '$scope', '$safeApply'];

    /* @ngInject */
    function Controller(UserService, $scope, $safeApply) {
        var vm = this;
        vm.user = null;

        function albumsFailure(){
          console.log('albumsFailure');
        }

        function albumsSuccess(receivedAlbums){
          $scope.$safeApply(function(){
            vm.albums = receivedAlbums.data;
          })
        }

        function onPhotosReceived(receivedPhotos){
          $scope.$safeApply(function(){
            vm.photos = receivedPhotos.data;
          })
        }

        function displayPhotos(albumId){
          facebookConnectPlugin.api("/" + albumId +
          "/photos?fields=source",['user_photos'],onPhotosReceived)

        }

        function getAlbumCoverSrc(albumId) {
          return "https://graph.facebook.com/" + albumId +
          "/picture?type=album&access_token=" + UserService.getAccessToken();
        } 

        function failureLogin(){
          console.log('failureLogin')

        }

        function initAlbums(){
          facebookConnectPlugin.api("/me/albums",
            ['user_photos'], albumsSuccess, albumsFailure)
        }

        function successLogin(res) {
          UserService.setAccessToken(res.authResponse.accessToken);
          facebookConnectPlugin.api("/me?fields=id,first_name,birthday,picture&accessToken"+
            res.authResponse.accessToken,['user_birthday','user_photos'],function(fbUser){
              $scope.$safeApply(function(){
                vm.user = fbUser;
              })
            })
        }

        function loginFacebook() {
          facebookConnectPlugin.login(['user_photos','user_birthday'],
            successLogin, failureLogin)
        }

        vm.displayPhotos = displayPhotos;
        vm.getAlbumCoverSrc = getAlbumCoverSrc;
        vm.initAlbums = initAlbums;
        vm.loginFacebook = loginFacebook;
    }
})();