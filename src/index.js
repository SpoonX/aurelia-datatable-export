import {Config} from 'aurelia-view-manager';

// added for bundling
import {DatatableExport} from './datatable-export'; // eslint-disable-line no-unused-vars

export function configure(aurelia) {
  aurelia.container.get(Config).configureNamespace('aurelia-datatable-export', {
    location: './{{framework}}/{{view}}.html'
  });

  aurelia.globalResources('./datatable-export');
}
