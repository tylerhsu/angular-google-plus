/*! angular-google-plus - v0.1.3 2016-01-06 */
/**
 * googleplus module
 */
angular.module("googleplus", []).provider("GooglePlus", [ function() {
    /**
     * Options object available for module
     * options/services definition.
     * @type {Object}
     */
    var a = {};
    /**
     * GoogleAuth
     * @type {gapi.auth2.GoogleAut}
     */
    var b = null;
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
        gapi.auth2.init(a);
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
    this.$get = [ "$rootScope", function(a) {
        /**
       * Define a deferred instance that will implement asynchronous calls
       * @type {Object}
       */
        var c;
        /**
       * NgGooglePlus Class
       * @type {Class}
       */
        var d = function() {};
        d.prototype.login = function() {
            return b.signIn();
        };
        d.prototype.getUser = function() {
            return b.then(function() {
                a.$apply();
                return b.currentUser;
            });
        };
        d.prototype.logout = function() {
            return b.signOut();
        };
        return new d();
    } ];
} ]).run([ function() {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.async = true;
    a.src = "https://apis.google.com/js/platform.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b);
} ]);