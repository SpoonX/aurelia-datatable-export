'use strict';

exports.__esModule = true;
exports.configure = configure;

var _aureliaViewManager = require('aurelia-view-manager');

var _datatableExport = require('./datatable-export');

function configure(aurelia) {
  aurelia.container.get(_aureliaViewManager.Config).configureNamespace('aurelia-datatable-export', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./datatable-export');
}