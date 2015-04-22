(function() {
require.config({
  "baseUrl": "../js/",
  paths: {
    analytics: 'lib/analytics',
   'jasmine': '../lib/jasmine-2.1.3/jasmine',
    'jasmine-html': '../lib/jasmine-2.1.3/jasmine-html',
    'boot': '../lib/jasmine-2.1.3/boot'
  },
  "shim": {
    'backbone': {
      "deps": ['underscore', 'jquery'],
      "exports": 'Backbone'
    },
    'underscore': {
      "exports": '_'
    },
    'jasmine': {
        exports: 'window.jasmineRequire'
      },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'window.jasmineRequire'
    },
    'boot': {
      deps: ['jasmine', 'jasmine-html'],
      exports: 'window.jasmineRequire'
    }
  }
});

  var specs = [
    '../spec/mainSpec'
  ];

  // Load Jasmine - This will still create all of the normal Jasmine browser globals unless `boot.js` is re-written to use the
  // AMD or UMD specs. `boot.js` will do a bunch of configuration and attach it's initializers to `window.onload()`. Because
  // we are using RequireJS `window.onload()` has already been triggered so we have to manually call it again. This will
  // initialize the HTML Reporter and execute the environment.
  require(['boot'], function (boot) {

    // Load the specs
    require(['../spec/mainSpec'] , function (spec) {
     
      // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
      window.onload()
    });
  });
})();
          