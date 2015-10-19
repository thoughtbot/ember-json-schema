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

### Generating Models

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

### Generating Mirage Factories

In your factory file, load the schema, generate the `JsonSchemaFactory`, and mix
it into the factory declaration:

```js
// app/mirage/factories/post.js

import schema from 'my-app/schemas/post';
import JsonSchemaFactory from 'ember-json-schema/mirage/factory';
import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend(JsonSchemaFactory.generate(schema), {
  // This generates the following factory attributes:
  //
  // title: 'abc123',
  // isPublished: false,
  // postedAt: () => new Date(),
  // likes: 0,
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

### Caveats

* When a JSON Schema declares `{ "type": ["string", "null"] }`, the Model and
  Factory generators will treat it as the first type (in this case,
`DS.attr('string')`).

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

## Contributing

See the [CONTRIBUTING] document.
Thank you, [contributors]!

  [CONTRIBUTING]: CONTRIBUTING.md
  [contributors]: https://github.com/thoughtbot/ember-json-schema/graphs/contributors

## License

ember-json-schema is Copyright (c) 2015 thoughtbot, inc.
It is free software, and may be redistributed
under the terms specified in the [LICENSE] file.

  [LICENSE]: /LICENSE.md

## About

ember-json-schema is maintained by [Sean Doyle][seanpdoyle].

![thoughtbot](https://thoughtbot.com/logo.png)
[seanpdoyle]: https://github.com/seanpdoyle

ember-json-schema is maintained and funded by thoughtbot, inc.
The names and logos for thoughtbot are trademarks of thoughtbot, inc.

We love open source software!
See [our other projects][community]
or [hire us][hire] to help build your product.

  [community]: https://thoughtbot.com/community?utm_source=github
  [hire]: https://thoughtbot.com/hire-us?utm_source=github
