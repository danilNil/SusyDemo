import $ from 'jquery';
import Backbone from 'backbone';
Backbone.$ = $;

export default Backbone.View.extend({
  initialize: function () {
    this.$el.find('.message')
      .text('Example view');
  }
});
