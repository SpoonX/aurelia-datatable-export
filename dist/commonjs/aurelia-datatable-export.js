'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _datatableExport = require('./datatable-export');

var _aureliaViewManager = require('aurelia-view-manager');

function configure(aurelia) {
  aurelia.container.get(_aureliaViewManager.Config).configureNamespace('aurelia-datatable-export', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./datatable-export');
}