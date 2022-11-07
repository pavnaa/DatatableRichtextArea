import { LightningElement } from 'lwc';
import richTextColumnType from "./richTextColumnType.html";
import LightningDatatable from "lightning/datatable";
export default class MycustomdataTable extends LightningDatatable {

    static customTypes={
        // custom type definition
        richText: {
            template: richTextColumnType,
            standardCellLayout: true
        }
    }
}
