import { LightningElement, wire, track } from 'lwc';
import getPayments from '@salesforce/apex/PaymentsController.getAllPayments';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class AccountCustomList extends LightningElement {

    //pageRef should be used for registerListener
    @wire(CurrentPageReference) pageRef;
    @track paymentData;
    @track listViewfilter;
    @track sortBy;
    @track defaultSortDirection = 'asc';
    @track sortDirection = 'asc';
    @track listViewColumns = [
        {
            label: 'Payment Number',
            fieldName: 'PaymentNumber',
            type: 'text',
            wrapText: true,
            sortable: true
        },
        {
            label: 'Account',
            fieldName: 'AccountId',
            type: 'text',
            wrapText: true,
            sortable: true
        },
        {
            label: 'Status',
            fieldName: 'Status',
            type: 'text',
            wrapText: true,
            sortable: true
        },
        {
            label: 'Amount',
            fieldName: 'Amount',
            type: 'currency',
            cellAttributes: { alignment: 'left' },
            wrapText: true,
            sortable: true
        }
    ];

    connectedCallback() {
        this.listenEvent();
    }

    listenEvent() {
        registerListener("filterevent", this.captureEvent, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    captureEvent(listViewfilter) {
        this.listViewfilter = listViewfilter;
    }

    @wire(getPayments, { filterStatus: '$listViewfilter' })
    allPayments({ error, data }) {
        if (data) {
            this.paymentData = data;
        } else if (error) {
            console.log('Table Error: ' + error.body.message);
        }
    }

    onHandleSort(event) {
        this.sortDirection = event.detail.sortDirection;
        this.sortBy = event.detail.fieldName;
        const cloneData = Object.assign([], this.paymentData);
        cloneData.sort(this.sortedBy(this.sortBy, this.sortDirection === 'asc' ? 1 : -1));
        this.paymentData = cloneData;
    }

    sortedBy(field, reverse, primer) {
        const key = primer ? function (x) {
            return primer(x[field]);
        } : function (x) {
            return x[field];
        };

        return function (a, b) {
            a = key(a);
            b = key(b);
            return reverse * ((a > b) - (b > a));
        };
    }
}