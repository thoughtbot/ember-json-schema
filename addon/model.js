import DS from 'ember-data';
import Ember from 'ember';

const { attr } = DS;

export default class Model {
  static generate(schema) {
    const attrs = {};

    Object.keys(schema.properties).forEach(key => {
      const name = Ember.String.camelize(key);
      const property = schema.properties[key];
      const type = property.type;

      if (type.match(/string|number|boolean|date/gi)) {
        attrs[name] = attr(type);
      } else if (type === 'array') {
        attrs[name] = attr({ defaultValue: [] });
      } else if (type === 'object') {
        attrs[name] = attr({ defaultValue: {} });
      }
    });

    return Ember.Mixin.create(attrs);
  }
}
