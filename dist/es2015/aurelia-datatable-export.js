import { DatatableExport } from './datatable-export';
import { Config } from 'aurelia-view-manager';

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('aurelia-datatable-export', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./datatable-export');
}