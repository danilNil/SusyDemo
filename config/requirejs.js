'use strict';

var path = require('path');

module.exports = {
  paths: function (componentsPath) {

    function dir(suffixPath) {
      return path.join(componentsPath, suffixPath);
    }

    function bsComponent(name) {
      return path.join(componentsPath, path.join('bootstrap-sass/assets/javascripts/bootstrap', name));
    }

    return {
      jquery: dir('jquery/dist/jquery'),
      fastclick: dir('fastclick/lib/fastclick'),
      underscore: dir('underscore/underscore'),
      backbone: dir('backbone/backbone'),

      bootstrap: dir('bootstrap-sass/assets/javascripts/bootstrap'),
      'bootstrap/affix': bsComponent('affix'),
      'bootstrap/alert': bsComponent('alert'),
      'bootstrap/button': bsComponent('button'),
      'bootstrap/carousel': bsComponent('carousel'),
      'bootstrap/collapse': bsComponent('collapse'),
      'bootstrap/dropdown': bsComponent('dropdown'),
      'bootstrap/modal': bsComponent('modal'),
      'bootstrap/popover': bsComponent('popover'),
      'bootstrap/scrollspy': bsComponent('scrollspy'),
      'bootstrap/tab': bsComponent('tab'),
      'bootstrap/tooltip': bsComponent('tooltip'),
      'bootstrap/transition': bsComponent('transition')
    };
  },

  shim: {
    'bootstrap/affix': ['jquery'],
    'bootstrap/alert': ['jquery'],
    'bootstrap/button': ['jquery'],
    'bootstrap/carousel': ['jquery'],
    'bootstrap/collapse': ['jquery'],
    'bootstrap/dropdown': ['jquery'],
    'bootstrap/modal': ['jquery'],
    'bootstrap/popover': ['jquery'],
    'bootstrap/scrollspy': ['jquery'],
    'bootstrap/tab': ['jquery'],
    'bootstrap/tooltip': ['jquery'],
    'bootstrap/transition': ['jquery']
  }
};
