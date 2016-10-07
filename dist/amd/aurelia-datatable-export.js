define(['exports', 'aurelia-view-manager', './datatable-export'], function (exports, _aureliaViewManager, _datatableExport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.container.get(_aureliaViewManager.Config).configureNamespace('aurelia-datatable-export', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./datatable-export');
  }
});