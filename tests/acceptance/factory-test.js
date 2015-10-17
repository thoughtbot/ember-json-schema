import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

module('Acceptance | factory test', {
  beforeEach() {
    this.application = startApp();
  },

  afterEach() {
    Ember.run(this.application, 'destroy');
  }
});

test('server.create', function(assert) {
  const post = server.create('post');
  const postedAt = new Date(post.posted_at);

  assert.ok(typeof post.title === 'string', 'generates a string');
  assert.ok(typeof post.is_published === 'boolean', 'generates a boolean');
  assert.ok(typeof post.likes === 'number', 'generates a number');
  assert.ok(typeof post.metadata === 'object', 'generates first type in array');
  assert.ok(!isNaN(postedAt.getUTCSeconds()), 'generates a date');
});
