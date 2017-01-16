import {bindable, customElement} from 'aurelia-templating';
import {DOM}                     from 'aurelia-pal';
import {resolvedView}            from 'aurelia-view-manager';
import json2csv                  from 'json2csv';
import js2xmlparser              from 'js2xmlparser';

@customElement('datatable-export')
@resolvedView('aurelia-datatable-export', 'datatable-export')
export class DatatableExport {
  @bindable columns   = [];
  @bindable datatable = null
  @bindable criteria  = {};
  @bindable format    = 'csv';
  @bindable filename  = 'export'

  doExport() {
    if (!this.datatable || !this.format) {
      return;
    }

    let rawColumns = (typeof this.columns === 'string' ? this.getColumns().split(',') : this.columns);

    return this.datatable.gatherData(this.criteria).then(result => {
      this[this.format](result, rawColumns);
    });
  }

  getColumns() {
    let cleanedColumns = this.columns;

    // Remove aliases and value converters
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

    // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
    if (window.navigator.msSaveOrOpenBlob) {
      return window.navigator.msSaveBlob(blob, this.filename + '.' + this.format);
    }

    let a = DOM.createElement('a');

    a.href     = window.URL.createObjectURL(blob, {type: 'text/plain'});
    a.download = this.filename + '.' + this.format;
    DOM.appendNode(a);
    a.click();
    DOM.removeNode(a);
  }

  csv(data, columns) {
    try {
      let csv = json2csv({data: data, fields: columns});

      this.download(csv);
    } catch (err) {
      this.datatable.triggerEvent('exception', {on: 'export', error: err});
    }
  }

  xml(data) {
    try {
      let xml = js2xmlparser.parse(this.datatable.resource, data);

      this.download(xml);
    } catch (err) {
      this.datatable.triggerEvent('exception', {on: 'export', error: err});
    }
  }
}
