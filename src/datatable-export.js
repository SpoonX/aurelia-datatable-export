import {inject}                       from 'aurelia-framework';
import {bindable, customElement}      from 'aurelia-templating';
import {DOM}                          from 'aurelia-pal';
import {resolvedView}                 from 'aurelia-view-manager';
import json2csv                       from 'json2csv';
import js2xmlparser                   from 'js2xmlparser';
import {Homefront}                    from 'homefront';
import {ConvertManagerValueConverter} from './convert-manager'

@customElement('datatable-export')
@resolvedView('aurelia-datatable-export', 'datatable-export')
@inject(ConvertManagerValueConverter)
export class DatatableExport {
  @bindable columns   = [];
  @bindable datatable = null
  @bindable criteria  = {};
  @bindable format    = 'csv';
  @bindable filename  = 'export'

  constructor(convertManager) {
    this.convertManager = convertManager;
  }

  doExport() {
    if (!this.datatable || !this.format) {
      return;
    }

    let rawColumns       = (typeof this.columns === 'string' ? this.getColumns().split(',') : this.columns);
    let columnConverters = (typeof this.columns === 'string' ? this.getConverters() : {});

    return this.datatable.gatherData(this.criteria).then(result => {
      let converters = Object.keys(columnConverters);

      if (converters.length) {
        // Apply the given converters on each row
        result = result.map(row => {
          converters.forEach(columnToConvert => {
            let value            = this.displayValue(row, columnToConvert);
            let convertersString = columnConverters[columnToConvert];

            row[columnToConvert] = this.convertManager.toView(value, convertersString);
          });

          return row;
        });
      }

      this[this.format](result, rawColumns);
    });
  }

  getConverters() {
    let fullColumnNames  = this.columns.split(',');
    let columnConverters = {};

    fullColumnNames.forEach(fullColumnName => {
      if (fullColumnName.indexOf(' | ') > -1) {
        let cleanColumnName = fullColumnName.substring(0, fullColumnName.indexOf(' | '));

        if (fullColumnName.indexOf(' as ') > -1) {
          cleanColumnName = fullColumnName.substring(0, fullColumnName.indexOf(' as '));
        }

        columnConverters[cleanColumnName.trim()] = fullColumnName.substring(fullColumnName.indexOf(' | '));
      }
    });

    return columnConverters;
  }

  getColumns() {
    let cleanedColumns = this.columns;

    // Remove aliases and value converters
    cleanedColumns = cleanedColumns.replace(/\sas\s[^,]*[\,]/gi, ',');
    cleanedColumns = cleanedColumns.replace(/\s\|\s[^,]*[\,]/gi, ',');

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

  displayValue(row, propertyName) {
    return new Homefront(row, Homefront.MODE_NESTED).fetch(propertyName);
  }
}
