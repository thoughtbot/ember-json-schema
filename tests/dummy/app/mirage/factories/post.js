import schema from 'dummy/schemas/post';
import JsonSchemaFactory from 'ember-json-schema/mirage/factory';
import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend(JsonSchemaFactory.generate(schema), {
});
