export default {
  type: 'object',
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
    other: { '$ref': 'other.json' },
    user_id: { type: 'number' },
    topic_ids: {
      type: 'array',
      items: { type: 'number' },
    },
  },
};
