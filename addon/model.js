import DS from 'ember-data';
import Ember from 'ember';

const { camelize, pluralize } = Ember.String;

function cleanKey(key) {
  return camelize(key.replace(/_id$|_ids$/, ''));
}

function buildProperty(key, name, type) {
  if (type.match(/string|number|boolean|date/i)) {
    if (key.match(/_id$/)) {
      return [name, DS.belongsTo({ async: true })];
    } else {
      return [name, DS.attr(type)];
    }
  } else if (type === 'array') {
    if (key.match(/_ids$/)) {
      return [pluralize(name), DS.hasMany({ async: true })];
    } else {
      return [name, DS.attr({ defaultValue: [] })];
    }
  } else if (type === 'object') {
    return [name, DS.attr({ defaultValue: {} })];
  }
}

export default class Model {
  static generate(schema) {
    const attributes = {};

    Object.keys(schema.properties).forEach(key => {
      const name = cleanKey(key);
      const property = schema.properties[key];
      const type = property.type;

      if (Ember.isArray(type)) {
        const [firstType] = type;

        const [attr, value] = buildProperty(key, name, firstType);

        attributes[attr] = value;
      } else {
        const [attr, value] = buildProperty(key, name, type);

        attributes[attr] = value;
      }
    });

    return Ember.Mixin.create(attributes);
  }
}
