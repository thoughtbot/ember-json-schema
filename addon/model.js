import DS from 'ember-data';
import Ember from 'ember';

const { attr, belongsTo, hasMany } = DS;
const { camelize, pluralize } = Ember.String;

function cleanKey(key) {
  return camelize(key.replace(/_id$|_ids$/, ''));
}

export default class Model {
  static generate(schema) {
    const attrs = {};

    Object.keys(schema.properties).forEach(key => {
      const name = cleanKey(key);
      const property = schema.properties[key];
      const type = property.type;

      if (type.match(/string|number|boolean|date/i)) {
        if (key.match(/_id$/)) {
          attrs[name] = belongsTo({ async: true });
        } else {
          attrs[name] = attr(type);
        }
      } else if (type === 'array') {
        if (key.match(/_ids$/)) {
          attrs[pluralize(name)] = hasMany({ async: true });
        } else {
          attrs[name] = attr({ defaultValue: [] });
        }
      } else if (type === 'object') {
        attrs[name] = attr({ defaultValue: {} });
      }
    });

    return Ember.Mixin.create(attrs);
  }
}
