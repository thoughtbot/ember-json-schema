import DS from 'ember-data';
import Ember from 'ember';
import RefParser from 'npm:json-schema-ref-parser';

const { camelize, pluralize } = Ember.String;

function cleanKey(key) {
  return camelize(key.replace(/_id$|_ids$/, ''));
}

function buildAttribute(key, name, type) {
  if (!type) {
    return [name, DS.attr()];
  } else if (type.match(/string|number|boolean|date/i)) {
    return [name, DS.attr(type)];
  } else if (type === 'array') {
    return [name, DS.attr({ defaultValue: () => [] })];
  } else if (type === 'object') {
    return [name, DS.attr({ defaultValue: () => { return {}; } })];
  } else {
    return [name, DS.attr()];
  }
}

function buildRelationship(key, name) {
  if (key === pluralize(key)) {
    return [pluralize(name), DS.hasMany({ async: true })];
  } else {
    return [name, DS.belongsTo({ async: true })];
  }
}

export default class Model {
  static generate(schema, options) {
    const attributes = {};
    console.log("schema:");
		console.log(schema);

    const parser = new RefParser();
    parser.dereference(schema)
      .then((schema) => {
        console.log("schemaResolved:");
        console.log(schema);
        if (typeof schema.properties !== 'undefined' &&
            typeof schema.properties.attributes !== 'undefined' &&
            typeof schema.properties.attributes.properties !== 'undefined') {
          const schemaAttributes = schema.properties.attributes.properties;

          Object.keys(schemaAttributes).forEach(key => {
            const name = cleanKey(key);
            const property = schemaAttributes[key];
            const type = property.type;

            if (Ember.isArray(type)) {
              const [firstType] = type;
              const [attr, value] = buildAttribute(key, name, firstType);
              attributes[attr] = value;
            } else {
              const [attr, value] = buildAttribute(key, name, type);
              attributes[attr] = value;
            }
          });
        }

        if (typeof schema.properties !== 'undefined' &&
            typeof schema.properties.relationships !== 'undefined' &&
            typeof schema.properties.relationships.properties !== 'undefined') {
          const schemaRelationships = schema.properties.relationships.properties;

          Object.keys(schemaRelationships).forEach(key => {
            const name = cleanKey(key);
            const [attr, value] = buildRelationship(key, name);
            attributes[attr] = value;
          });
        }
      })
      .catch((err) => {
        console.log("ERROR");
        console.error(err);
      });

    return Ember.Mixin.create(attributes);
  }
}
