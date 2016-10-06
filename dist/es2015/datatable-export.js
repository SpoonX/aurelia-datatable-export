var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

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

import { bindable, customElement } from 'aurelia-templating';
import { resolvedView } from 'aurelia-view-manager';
import json2csv from 'json2csv';

export let DatatableExport = (_dec = customElement('datatable-export'), _dec2 = resolvedView('aurelia-datatable-export', 'datatable-export'), _dec(_class = _dec2(_class = (_class2 = class DatatableExport {
  constructor() {
    _initDefineProp(this, 'columns', _descriptor, this);

    _initDefineProp(this, 'datatable', _descriptor2, this);

    _initDefineProp(this, 'criteria', _descriptor3, this);
  }

  doExport() {
    if (!this.datatable) {
      return;
    }

    return this.datatable.gatherData(this.criteria).then(result => {
      try {
        let csv = json2csv({ data: result, fields: this.columns });
        let blob = new Blob([csv]);

        if (window.navigator.msSaveOrOpenBlob) {
          return window.navigator.msSaveBlob(blob, 'export.csv');
        }

        let a = window.document.createElement('a');

        a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
        a.download = 'export.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        this.datatable.triggerEvent('exception', { on: 'export', error: err });
      }
    });
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'columns', [bindable], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'datatable', [bindable], {
  enumerable: true,
  initializer: function () {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'criteria', [bindable], {
  enumerable: true,
  initializer: function () {
    return {};
  }
})), _class2)) || _class) || _class);