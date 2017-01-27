import {Config,resolvedView} from 'aurelia-view-manager';
import {bindable,customElement} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

// added for bundling
// eslint-disable-line no-unused-vars
export declare function configure(aurelia?: any): any;
export declare class DatatableExport {
  columns: any;
  datatable: any;
  criteria: any;
  format: any;
  filename: any;
  data: any;
  doExport(): any;
  getColumns(): any;
  download(data?: any): any;
  csv(data?: any, columns?: any): any;
  xml(data?: any): any;
}