var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

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
import { DOM } from 'aurelia-pal';
import { resolvedView } from 'aurelia-view-manager';
import json2csv from 'json2csv';
import js2xmlparser from 'js2xmlparser';

export let DatatableExport = (_dec = customElement('datatable-export'), _dec2 = resolvedView('aurelia-datatable-export', 'datatable-export'), _dec(_class = _dec2(_class = (_class2 = class DatatableExport {
  constructor() {
    _initDefineProp(this, 'columns', _descriptor, this);

    _initDefineProp(this, 'datatable', _descriptor2, this);

    _initDefineProp(this, 'criteria', _descriptor3, this);

    _initDefineProp(this, 'format', _descriptor4, this);

    _initDefineProp(this, 'filename', _descriptor5, this);

    _initDefineProp(this, 'data', _descriptor6, this);
  }

  doExport() {
    let rawColumns = typeof this.columns === 'string' ? this.getColumns().split(',') : this.columns;

    if (this.data) {
      return this[this.format](this.data, this.columns);
    }

    if (!this.datatable || !this.format) {
      return;
    }

    return this.datatable.gatherData(this.criteria).then(result => {
      this[this.format](result, rawColumns);
    });
  }

  getColumns() {
    let cleanedColumns = this.columns;

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
  }

  download(data) {
    let blob = new Blob([data]);

    if (window.navigator.msSaveOrOpenBlob) {
      return window.navigator.msSaveBlob(blob, this.filename + '.' + this.format);
    }

    let a = DOM.createElement('a');

    a.href = window.URL.createObjectURL(blob, { type: 'text/plain' });
    a.download = this.filename + '.' + this.format;
    DOM.appendNode(a);
    a.click();
    DOM.removeNode(a);
  }

  csv(data, columns) {
    try {
      let csv = json2csv({ data: data, fields: columns });

      this.download(csv);
    } catch (err) {
      this.datatable.triggerEvent('exception', { on: 'export', error: err });
    }
  }

  xml(data) {
    try {
      let xml = js2xmlparser.parse(this.datatable.resource, data);

      this.download(xml);
    } catch (err) {
      this.datatable.triggerEvent('exception', { on: 'export', error: err });
    }
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'format', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'csv';
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'filename', [bindable], {
  enumerable: true,
  initializer: function () {
    return 'export';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'data', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class);