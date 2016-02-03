/*! angular-google-plus - v0.1.3 2016-02-03 */
/**
 * googleplus module
 */
var app = angular.module("googleplus", []);

app.service("gaLoad", [ function() {
    var a;
    return {
        setScript: function(b) {
            a = b;
        },
        getScript: function() {
            return a;
        }
    };
} ]);

/**
 * GooglePlus provider
 */
app.provider("GooglePlus", [ function() {
    /**
   * Options object available for module
   * options/services definition.
   * @type {Object}
   */
    var a = {};
    /**
   * client_id
   * @type {Number}
   */
    a.client_id = null;
    this.setClientId = function(b) {
        a.client_id = b;
        return this;
    };
    this.getClientId = function() {
        return a.client_id;
    };
    /**
   * apiKey
   * @type {String}
   */
    a.apiKey = null;
    this.setApiKey = function(b) {
        a.apiKey = b;
        return this;
    };
    this.getApiKey = function() {
        return a.apiKey;
    };
    /**
   * Scopes
   * @default 'https://www.googleapis.com/auth/plus.login'
   * @type {Boolean}
   */
    a.scope = "https://www.googleapis.com/auth/plus.login";
    this.setScope = function(b) {
        a.scope = b;
        return this;
    };
    this.getScope = function() {
        return a.scope;
    };
    /**
   * Init Google Plus API
   */
    this.init = function(b) {
        angular.extend(a, b);
    };
    /**
   * Make sign-in server side
   */
    this.enableServerSide = function() {
        a.accessType = "offline";
        a.responseType = "code token id_token gsession";
    };
    /**
   * Make sign-in client side (default)
   */
    this.disableServerSide = function() {
        delete a.accessType;
        delete a.responseType;
    };
    /**
   * This defines the Google Plus Service on run.
   */
    this.$get = [ "$q", "gaLoad", function(b, c) {
        c.getScript().onload = function() {
            /**
      * GoogleAuth
      * @type {gapi.auth2.GoogleAuth}
      **/
            gapi.load("auth2", function() {
                gAuth = gapi.auth2.init(a);
            });
        };
        /**
     * NgGooglePlus Class
     * @type {Class}
     */
        var d = function() {};
        d.prototype.ready = function() {
            var a = b.defer();
            gAuth.then(function() {
                a.resolve();
            });
            return a.promise;
        };
        d.prototype.login = function() {
            return gAuth.signIn().then(function(a) {
                return a.getAuthResponse();
            });
        };
        d.prototype.getUser = function() {
            return gAuth.currentUser;
        };
        d.prototype.logout = function() {
            return gAuth.signOut();
        };
        return new d();
    } ];
} ]);

// Initialization of module
app.run([ "gaLoad", function(a) {
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = "https://apis.google.com/js/platform.js";
    var c = document.getElementsByTagName("script")[0];
    c.parentNode.insertBefore(b, c);
    a.setScript(b);
} ]);