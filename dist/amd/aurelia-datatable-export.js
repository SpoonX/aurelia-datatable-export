define(['exports', './datatable-export', 'aurelia-view-manager'], function (exports, _datatableExport, _aureliaViewManager) {
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