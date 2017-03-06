/* jshint node: true */
'use strict';

var jsonModule = require('broccoli-json-schema-module');

module.exports = {
  name: 'ember-json-schema',

  treeForApp: function() {
    return jsonModule(this.app.trees.app);
  },

  treeForTestSupport: function() {
    return jsonModule(this.app.trees.tests);
  }
};
