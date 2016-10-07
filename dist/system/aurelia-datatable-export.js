'use strict';

System.register(['aurelia-view-manager', './datatable-export'], function (_export, _context) {
  "use strict";

  var Config, DatatableExport;
  function configure(aurelia) {
    aurelia.container.get(Config).configureNamespace('aurelia-datatable-export', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./datatable-export');
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaViewManager) {
      Config = _aureliaViewManager.Config;
    }, function (_datatableExport) {
      DatatableExport = _datatableExport.DatatableExport;
    }],
    execute: function () {}
  };
});