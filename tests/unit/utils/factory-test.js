import { module, test } from 'qunit';
import JsonSchemaFactory from 'ember-json-schema/mirage/factory';

module('Factory');

test('generate', assert => {
  const schema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  };

  const attrs = JsonSchemaFactory.generate(schema);

  assert.ok(!attrs.id, 'does not generate id attribute');
});
