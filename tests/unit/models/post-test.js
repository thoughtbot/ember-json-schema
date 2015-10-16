import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

const { get } = Ember;

moduleForModel('post', 'Unit | Model | post', {
  // Specify the other units that are required for this test.
  needs: []
});

test('attrs', function(assert) {
  const modelClass = this.store().modelFor('post');
  const attrs = get(modelClass, 'attributes');
  const model = this.subject();

  const title = attrs.get('title');

  assert.equal(title.name, 'title', 'generates string attribute');
  assert.equal(title.type, 'string', 'generates string attribute');

  const postedAt = attrs.get('postedAt');

  assert.equal(postedAt.name, 'postedAt', 'generates date attribute');
  assert.equal(postedAt.type, 'date', 'generates date attribute');

  const isPublished = attrs.get('isPublished');

  assert.equal(isPublished.name, 'isPublished', 'generates boolean attribute');
  assert.equal(isPublished.type, 'boolean', 'generates boolean attribute');

  const likes = attrs.get('likes');

  assert.equal(likes.name, 'likes', 'generates number attribute');
  assert.equal(likes.type, 'number', 'generates number attribute');

  const tags = attrs.get('tags');

  assert.equal(tags.name, 'tags', 'generates generic attribute');
  assert.equal(tags.type, null, 'generates generic attribute');

  assert.deepEqual(get(model, 'tags'), [], 'defaults to empty array');

  const hash = attrs.get('hash');

  assert.equal(hash.name, 'hash', 'generates generic attribute');
  assert.equal(hash.type, null, 'generates generic attribute');

  assert.deepEqual(get(model, 'hash'), {}, 'defaults to empty object');
});
