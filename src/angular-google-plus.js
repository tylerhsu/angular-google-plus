
/**
 * googleplus module
 */
var app = angular.module('googleplus', []);

var loadScript = true;

var scriptUrl = 'https://apis.google.com/js/platform.js';

app.service('gaLoad', [function(){

  var script;

  return {
    setScript : function(_script){ script = _script; },
    getScript : function(){return script; }
  };

}]);
/**
 * GooglePlus provider
 */
app.provider('GooglePlus', [function() {
  /**
   * Options object available for module
   * options/services definition.
   * @type {Object}
   */
  var options = {};

  /**
   * client_id
   * @type {Number}
   */
  options.client_id = null;

  this.setClientId = function(client_id) {
    options.client_id = client_id;
    return this;
  };

  this.getClientId = function() {
    return options.client_id;
  };

  /**
   * apiKey
   * @type {String}
   */
  options.apiKey = null;

  this.setApiKey = function(apiKey) {
    options.apiKey = apiKey;
    return this;
  };

  this.getApiKey = function() {
    return options.apiKey;
  };

  /**
   * Scopes
   * @default 'https://www.googleapis.com/auth/plus.login'
   * @type {Boolean}
   */
  options.scope = 'https://www.googleapis.com/auth/plus.login';

  this.setScope = function(scope) {
    options.scope = scope;
    return this;
  };

  this.getScope = function() {
    return options.scope;
  };

  /**
   * Init Google Plus API
   */
  this.init = function(customOptions) {
    angular.extend(options, customOptions);
  };

  /**
   * Make sign-in server side
   */
  this.enableServerSide = function () {
    options.accessType = 'offline';
    options.responseType = 'code token id_token gsession';
  };

  /**
   * Make sign-in client side (default)
   */
  this.disableServerSide = function () {
    delete options.accessType;
    delete options.responseType;
  };

  this.setLoadScript = function(val) {
    loadScript = !!val;
  };

  this.getLoadScript = function() {
    return !!loadScript;
  };

  /**
   * This defines the Google Plus Service on run.
   */
  this.$get = ['$q', '$window', 'gaLoad', function($q, $window, gaLoad) {
    var gAuth = null;
    function loadAuth2(){
      /**
      * GoogleAuth
      * @type {gapi.auth2.GoogleAuth}
      **/
      $window.gapi.load("auth2", function() {
          gAuth = gapi.auth2.init(options);
      });
    }

    if($window.gapi) loadAuth2();
    else gaLoad.getScript().onload = loadAuth2;

    /**
    * NgGooglePlus Class
    * @type {Class}
    */
   
    var NgGooglePlus = function () {};

    NgGooglePlus.prototype.ready = function() {
      var deferred = $q.defer();

      gAuth.then(function(){
        deferred.resolve();
      });

      return deferred.promise;
    };

    NgGooglePlus.prototype.login =  function () {
      return gAuth.signIn().then(function(gUser){
        return gUser.getAuthResponse();
      });
    };

    NgGooglePlus.prototype.getUser = function() {
      return gAuth.currentUser;
    };

    NgGooglePlus.prototype.logout =  function () {
      return gAuth.signOut();
    };

    NgGooglePlus.prototype.loadScript = function() {
      gaLoad.getScript().src = scriptUrl;
    };

    return new NgGooglePlus();
  }];

}])

// Initialization of module
.run(['gaLoad', function(gaLoad) {
  var po = document.createElement('script');
  po.type = 'text/javascript';
  po.async = true;
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(po, s);
  gaLoad.setScript(po);

  if (loadScript) {
    po.src = scriptUrl;
  }
}]);
