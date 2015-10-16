import DS from 'ember-data';
import schema from '../schemas/post';
import { JsonSchemaModel } from 'ember-json-schema';

export default DS.Model.extend(JsonSchemaModel.generate(schema), {
});
