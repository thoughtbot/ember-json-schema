export default class Factory {
  static generate(schema) {
    const attrs = {};
    const properties = schema.properties;

    Object.keys(properties).forEach(key => {
      const property = properties[key];

      if (property.type === 'string') {
        attrs[key] = (i) => `${key} #${i}`;
      } else if (property.type === 'number') {
        attrs[key] = 0;
      } else if (property.type === 'date') {
        attrs[key] = () => new Date();
      } else if (property.type === 'boolean') {
        attrs[key] = false;
      } else if (property.type === 'object') {
        attrs[key] = {};
      } else if (property.type === 'array') {
        attrs[key] = [];
      }
    });

    return attrs;
  }
}
