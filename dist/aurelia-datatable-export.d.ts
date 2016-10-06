import json2csv from 'json2csv';
import {Config,resolvedView} from 'aurelia-view-manager';
import {bindable,customElement} from 'aurelia-templating';

// added for bundling
// eslint-disable-line no-unused-vars
export declare function configure(aurelia?: any): any;
export declare class DatatableExport {
  columns: any;
  datatable: any;
  criteria: any;
  doExport(): any;
}