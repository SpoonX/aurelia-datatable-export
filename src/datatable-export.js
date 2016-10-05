import {bindable, customElement} from 'aurelia-templating';
import {resolvedView} from 'aurelia-view-manager';
import json2csv from 'json2csv';

@customElement('datatable-export')
@resolvedView('aurelia-datatable-export', 'datatable-export')
export class DatatableExport {
  @bindable columns   = [];
  @bindable datatable = null
  @bindable criteria  = {};

  doExport() {
    if (!this.datatable) {
      return;
    }

    return this.datatable.gatherData(this.criteria).then(result => {
      try {
        let csv  = json2csv({data: result, fields: this.columns});
        let blob = new Blob([csv]);

        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, "export.csv");
        }
        else {
          let a = window.document.createElement("a");

          a.href     = window.URL.createObjectURL(blob, {type: "text/plain"});
          a.download = "export.csv";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      } catch (err) {
        this.datatable.triggerEvent('exception', {on: 'export', error: err});
      }
    });
  }
}
