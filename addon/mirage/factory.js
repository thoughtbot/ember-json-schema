import Ember from 'ember';

function generateValue(type, key) {
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
    const attrs = {};
    const properties = schema.properties;

    Object.keys(properties).forEach(key => {
      const property = properties[key];

      if (Ember.isArray(property.type)) {
        const [firstType] = property.type;
        attrs[key] = generateValue(firstType, key);
      } else if (key !== 'id') {
        attrs[key] = generateValue(property.type, key);
      }
    });

    return attrs;
  }
}
