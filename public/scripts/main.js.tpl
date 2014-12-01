<% if(typeof config !== 'undefined') { %>requirejs.config(<%= config %>);<% } %>require(['app'], function (App) {
  App.default.initialize();
});
