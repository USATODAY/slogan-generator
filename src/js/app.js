define(
  [
    'jquery',
    'underscore',
    'templates',
    'base'
  ],
  function(jQuery, _, templates, base){
    var app = app || {};

    app.init = base.init;

    return app;

});
