'use strict';

System.register(['aurelia-templating', 'aurelia-pal', 'aurelia-view-manager', 'json2csv', 'js2xmlparser'], function (_export, _context) {
  "use strict";

  var bindable, customElement, DOM, resolvedView, json2csv, js2xmlparser, _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, DatatableExport;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  return {
    setters: [function (_aureliaTemplating) {
      bindable = _aureliaTemplating.bindable;
      customElement = _aureliaTemplating.customElement;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaViewManager) {
      resolvedView = _aureliaViewManager.resolvedView;
    }, function (_json2csv) {
      json2csv = _json2csv.default;
    }, function (_js2xmlparser) {
      js2xmlparser = _js2xmlparser.default;
    }],
    execute: function () {
      _export('DatatableExport', DatatableExport = (_dec = customElement('datatable-export'), _dec2 = resolvedView('aurelia-datatable-export', 'datatable-export'), _dec(_class = _dec2(_class = (_class2 = function () {
        function DatatableExport() {
          

          _initDefineProp(this, 'columns', _descriptor, this);

          _initDefineProp(this, 'datatable', _descriptor2, this);

          _initDefineProp(this, 'criteria', _descriptor3, this);

          _initDefineProp(this, 'format', _descriptor4, this);

          _initDefineProp(this, 'filename', _descriptor5, this);

          _initDefineProp(this, 'data', _descriptor6, this);
        }

        DatatableExport.prototype.doExport = function doExport() {
          var _this = this;

          var rawColumns = typeof this.columns === 'string' ? this.getColumns().split(',') : this.columns;

          if (this.data) {
            return this[this.format](this.data, this.columns);
          }

          if (!this.datatable || !this.format) {
            return;
          }

          return this.datatable.gatherData(this.criteria).then(function (result) {
            _this[_this.format](result, rawColumns);
          });
        };

        DatatableExport.prototype.getColumns = function getColumns() {
          var cleanedColumns = this.columns;

          cleanedColumns = cleanedColumns.replace(/\sas\s.*[\,]/gi, ',');
          cleanedColumns = cleanedColumns.replace(/\s\|\s.*[\,]/gi, ',');

          if (cleanedColumns.indexOf(' as ') > -1) {
            cleanedColumns = cleanedColumns.substring(0, cleanedColumns.indexOf(' as '));
          }
          if (cleanedColumns.indexOf(' | ') > -1) {
            cleanedColumns = cleanedColumns.substring(0, cleanedColumns.indexOf(' | '));
          }

          cleanedColumns = cleanedColumns.replace(/\s/g, '');

          return cleanedColumns;
        };

        DatatableExport.prototype.download = function download(data) {
          var blob = new Blob([data]);

          if (window.navigator.msSaveOrOpenBlob) {
            return window.navigator.msSaveBlob(blob, this.filename + '.' + this.format);
          }

          var a = DOM.createElement('a');

          a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
          a.download = this.filename + '.' + this.format;
          DOM.appendNode(a);
          a.click();
          DOM.removeNode(a);
        };

        DatatableExport.prototype.csv = function csv(data, columns) {
          try {
            var csv = json2csv({ data: data, fields: columns });

            this.download(csv);
          } catch (err) {
            this.datatable.triggerEvent('exception', { on: 'export', error: err });
          }
        };

        DatatableExport.prototype.xml = function xml(data) {
          try {
            var xml = js2xmlparser.parse(this.datatable.resource, data);

            this.download(xml);
          } catch (err) {
            this.datatable.triggerEvent('exception', { on: 'export', error: err });
          }
        };

        return DatatableExport;
      }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columns', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'datatable', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return {};
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'format', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return 'csv';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'filename', [bindable], {
        enumerable: true,
        initializer: function initializer() {
          return 'export';
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'data', [bindable], {
        enumerable: true,
        initializer: null
      })), _class2)) || _class) || _class));

      _export('DatatableExport', DatatableExport);
    }
  };
});