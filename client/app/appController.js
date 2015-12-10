angular.module('app').controller('viddlerController', function($http, toaster) {
    var self = this;
    var sessionId = '';
    var uploadEndpoint = '';
    var uploadToken = '';

    self.upload = function(ctrl) {
        $http.get('/auth', { params: { username: ctrl.user, password: ctrl.pass, api_key: ctrl.key } })
             .then(function(resp) {
                 if(resp.data.error) {
                   toaster.error({ title: "Auth Error", body: resp.data.error.description });
                   return;
                 }
                 
                 sessionId = resp.data.auth.sessionid;
                 toaster.success({ title: '', body: 'Logged in' });
                 
                 $http.get('/prepare', { params: { api_key: ctrl.key, sessionid: sessionId } })
                      .then(function(resp) {
                        if(resp.data.error) {
                          toaster.error({ title: "Prepare Error", body: resp.data.error.description });
                          return;
                        }
                 
                 uploadEndpoint = resp.data.upload.endpoint;
                 uploadToken = resp.data.upload.token;
                 toaster.success({title: '', body: 'Prepared for upload'});
                 
                 toaster.info({title:'', body: 'Uploading...'});
                 $http.post('/upload', { headers: {'Content-Type': undefined}, params: { files: ctrl.files, endpoint: uploadEndpoint, token: uploadToken, api_key: ctrl.key, sessionid: sessionId }})
                      .then(function(resp) {
                        if(resp.data.error) {
                            toaster.error({title: "Upload Error", body: resp.data.error.description});
                            return;
                        }
                        
                        toaster.success({title: '', body: 'Upload successful!'});
                      }, function(error) { console.log(error); });

             }, function(error) {
                 
             });
             }, function(error) {
                 console.log("Auth error - " + error.data.error.description);
             });
    };
})
.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);;