'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatatableExport = undefined;

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

var _aureliaTemplating = require('aurelia-templating');

var _aureliaViewManager = require('aurelia-view-manager');

var _json2csv = require('json2csv');

var _json2csv2 = _interopRequireDefault(_json2csv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var DatatableExport = exports.DatatableExport = (_dec = (0, _aureliaTemplating.customElement)('datatable-export'), _dec2 = (0, _aureliaViewManager.resolvedView)('aurelia-datatable-export', 'datatable-export'), _dec(_class = _dec2(_class = (_class2 = function () {
  function DatatableExport() {
    

    _initDefineProp(this, 'columns', _descriptor, this);

    _initDefineProp(this, 'datatable', _descriptor2, this);

    _initDefineProp(this, 'criteria', _descriptor3, this);
  }

  DatatableExport.prototype.doExport = function doExport() {
    var _this = this;

    if (!this.datatable) {
      return;
    }

    return this.datatable.gatherData(this.criteria).then(function (result) {
      try {
        var csv = (0, _json2csv2.default)({ data: result, fields: _this.columns });
        var blob = new Blob([csv]);

        if (window.navigator.msSaveOrOpenBlob) {
          return window.navigator.msSaveBlob(blob, 'export.csv');
        }

        var a = window.document.createElement('a');

        a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
        a.download = 'export.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        _this.datatable.triggerEvent('exception', { on: 'export', error: err });
      }
    });
  };

  return DatatableExport;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columns', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'datatable', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [_aureliaTemplating.bindable], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
})), _class2)) || _class) || _class);