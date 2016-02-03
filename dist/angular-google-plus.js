/*! angular-google-plus - v0.2.4 2016-02-03 */
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
    this.$get = [ "$q", "$window", "gaLoad", function(b, c, d) {
        var e = null;
        function f() {
            /**
      * GoogleAuth
      * @type {gapi.auth2.GoogleAuth}
      **/
            c.gapi.load("auth2", function() {
                e = gapi.auth2.init(a);
            });
        }
        if (c.gapi) f(); else d.getScript().onload = f;
        /**
    * NgGooglePlus Class
    * @type {Class}
    */
        var g = function() {};
        g.prototype.ready = function() {
            var a = b.defer();
            e.then(function() {
                a.resolve();
            });
            return a.promise;
        };
        g.prototype.login = function() {
            return e.signIn().then(function(a) {
                return a.getAuthResponse();
            });
        };
        g.prototype.getUser = function() {
            return e.currentUser;
        };
        g.prototype.logout = function() {
            return e.signOut();
        };
        return new g();
    } ];
} ]).run([ "gaLoad", function(a) {
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = "https://apis.google.com/js/platform.js";
    var c = document.getElementsByTagName("script")[0];
    c.parentNode.insertBefore(b, c);
    a.setScript(b);
} ]);