# Ember JSON Schema

Generate Ember-Data models from JSON Schemas.

## Usage

First, install the addon:

    $ ember install ember-json-schema

Then, either import or declare your schema:

```js
// app/schemas/post.js

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
    user_id: { type: 'number' },
    topic_ids: {
      type: 'array',
      items: { type: 'number' },
    }
  },
};
```

In your model file, load the schema, generate the `JsonSchemaModel`, and mix it
into the model declaration:

```js
// app/models/post.js

import DS from 'ember-data';
import schema from 'my-app/schemas/post';
import { JsonSchemaModel } from 'ember-json-schema';

export default DS.Model.extend(JsonSchemaModel.generate(schema), {
  // This generates the following attributes:
  //
  // user: DS.belongsTo({ async: true }),
  // topics: DS.hasMany({ async: true }),
  //
  // title: DS.attr('string'),
  // isPublished: DS.attr('boolean'),
  // postedAt: DS.attr('date'),
  // likes: DS.attr('number'),
  // tags: DS.attr({ defaultValue: [] }),
  // hash: DS.attr({ defaultValue: {} }),
});
```

### Loading Schema from JSON files

Use [`ember-cli-json-module`] to load your raw `.json` files.

[`ember-cli-json-module`]: https://github.com/IvyApp/ember-cli-json-module#installation--usage

### Loading Schema from an EmberCLI Rails application

First, install the `ember-cli-json-module` addon.

If your EmberCLI repository is resides within your Rails repository, you can
[symlink] your schema from your Rails directories to your Ember directories:

    $ mkdir -p app/schemas
    $ cd app/schemas
    $ ln -s ../../spec/support/api/schemas/post.json post.json

Then, load the schema from your model like normal.

[symlink]: https://en.wikipedia.org/wiki/Symbolic_link

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
