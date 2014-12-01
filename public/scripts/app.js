import ExampleView from 'views/example';
import FastClick from 'fastclick';
import 'bootstrap/alert';

export default {
  initialize: function () {
    FastClick.attach(document.body);
    new ExampleView({ el: '#example-view' });
  }
};
