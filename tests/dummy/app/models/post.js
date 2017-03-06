import DS from 'ember-data';

// Make sure that this module is loaded in the app directory
// and that JSHint doesn't complain

import { JsonSchemaModel } from 'ember-json-schema';
import schema from '../schemas/post';

export default DS.Model.extend(JsonSchemaModel.generate(schema), {
});
