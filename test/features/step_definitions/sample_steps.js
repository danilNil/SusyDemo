'use strict';

module.exports = function () {

  this.Given('I\'m on the home page', function (done) {
    this.browser.visit('http://localhost:3000', done);
  });

  this.Then('I should see "$title" in the title of the page', function (title, done) {
    expect(this.browser.text('title')).to.eq(title);
    done();
  });

  this.When('I click on "$selector" alert close button', function (selector, done) {
    this.alertSelector = selector;
    this.browser.pressButton(selector + ' .close[data-dismiss=alert]', done);
  });

  this.Then('Alert should disappear', function (done) {
    expect(this.browser.document.querySelector(this.alertSelector)).to.be.null;
    delete this.alertSelector;
    done();
  });
};
