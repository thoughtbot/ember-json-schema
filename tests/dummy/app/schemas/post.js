export default {
  type: 'object',
  required: ['id', 'type', 'links', 'attributes', 'relationships'],
  properties: {
    id: { type: 'string' },
    type: {
      type: 'string',
      pattern: '^posts$'
    },
    links: {
      type: 'object',
      required: ['self'],
      properties: {
        self: { type: 'uri' }
      }
    },
    attributes: {
      type: 'object',
      required: ['title', 'is_published', 'posted_at', 'likes', 'tags', 'hash', 'other'],
      properties: {
        title: { type: 'string' },
        is_published: { type: 'boolean' },
        posted_at: { type: 'date' },
        likes: { type: 'number' },
        tags: {
          type: 'array',
          items: { type: 'string' }
        },
        hash: { type: 'object' },
        metadata: { type: ['object', 'null'] },
        other: { '$ref': 'other.json' }
      }
    },
    relationships: {
      type: 'object',
      required: ['user'],
      properties: {
        user: {
          '$ref': 'user.json#definitions/user'
        },
        topics: {
          type: 'object',
          required: ['links'],
          properties: {
            links: {
              type: 'object',
              required: ['related'],
              properties: {
                related: { type: 'uri' }
              }
            }
          }
        }
      }
    }
  }
};
