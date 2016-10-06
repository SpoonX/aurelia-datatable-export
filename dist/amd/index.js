define(['exports', './aurelia-datatable-export'], function (exports, _aureliaDatatableExport) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaDatatableExport).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaDatatableExport[key];
      }
    });
  });
});