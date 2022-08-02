import LightningDatatable from 'lightning/datatable';
import customTypeProgressRing from './customTypeProgressRing';

export default class DatatableWithProgressRing extends LightningDatatable {
    static customTypes = {
        progressRing: { template: customTypeProgressRing, typeAttributes: ['value', 'class'] }
    };
}