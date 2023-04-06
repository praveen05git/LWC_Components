import { LightningElement, api, wire, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class ListViewFilterCustom extends LightningElement {

    @api listViewfilter;
    @wire(CurrentPageReference) pageRef;

    get listViewOptions() {
        return [
            { label: 'Draft', value: 'Draft' },
            { label: 'Processed', value: 'Processed' },
            { label: 'All Payments', value: 'allPayments' },
        ];
    }

    handleListViewChange(event) {
        this.listViewfilter = event.detail.value;

        fireEvent(this.pageRef, "filterevent", this.listViewfilter);
    }
}