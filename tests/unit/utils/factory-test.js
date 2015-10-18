import { module, test } from 'qunit';
import JsonSchemaFactory from 'ember-json-schema/mirage/factory';

module('Factory');

test('generate', assert => {
  const schema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      other: { '$ref': 'other.json' },
    },
  };

  const attrs = JsonSchemaFactory.generate(schema);

  assert.ok(!attrs.id, 'does not generate id attribute');
  assert.ok(!attrs.other, 'generates null from $ref');
  assert.equal(typeof attrs.other, 'object', 'generates property from $ref');
});
