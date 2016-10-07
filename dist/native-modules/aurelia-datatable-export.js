import { Config } from 'aurelia-view-manager';

import { DatatableExport } from './datatable-export';

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('aurelia-datatable-export', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./datatable-export');
}