'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaDatatableExport = require('./aurelia-datatable-export');

Object.keys(_aureliaDatatableExport).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaDatatableExport[key];
    }
  });
});