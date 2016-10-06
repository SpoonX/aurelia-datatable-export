'use strict';

System.register(['./datatable-export', 'aurelia-view-manager'], function (_export, _context) {
  "use strict";

  var DatatableExport, Config;
  function configure(aurelia) {
    aurelia.container.get(Config).configureNamespace('aurelia-datatable-export', {
      location: './{{framework}}/{{view}}.html'
    });

    aurelia.globalResources('./datatable-export');
  }

  _export('configure', configure);

  return {
    setters: [function (_datatableExport) {
      DatatableExport = _datatableExport.DatatableExport;
    }, function (_aureliaViewManager) {
      Config = _aureliaViewManager.Config;
    }],
    execute: function () {}
  };
});