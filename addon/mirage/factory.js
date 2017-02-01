import Ember from 'ember';

function generateValue(key, type) {
  if (type === 'string') {
    return (i) => `${key} #${i}`;
  } else if (type === 'number') {
    return 0;
  } else if (type === 'date') {
    return () => new Date();
  } else if (type === 'boolean') {
    return false;
  } else if (type === 'object') {
    return {};
  } else if (type === 'array') {
    return [];
  } else {
    return null;
  }
}

export default class Factory {
  static generate(schema) {
    const attributes = {};

    if (typeof schema.properties !== 'undefined' &&
        typeof schema.properties.attributes !== 'undefined' &&
        typeof schema.properties.attributes.properties !== 'undefined') {
      const schemaAttributes = schema.properties.attributes.properties;

      Object.keys(schemaAttributes).forEach(key => {
        const property = schemaAttributes[key];
        const type = property.type;

        if (Ember.isArray(type)) {
          const [firstType] = type;
          attributes[key] = generateValue(key, firstType);
        } else if (key !== 'id') {
          attributes[key] = generateValue(key, type);
        }
      });
    }

    return attributes;
  }
}
