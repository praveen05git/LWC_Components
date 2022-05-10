import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountsController.getAllAccounts';

export default class AccountCustomList extends LightningElement {

    baseUrl = '/s/';
    @track accountData;
    @track sortBy;
    @track defaultSortDirection = 'asc';
    @track sortDirection = 'asc';
    @track listViewColumns = [
        {
            label: 'Account Name',
            fieldName: 'nameUrl',
            type: 'url',
            typeAttributes: {
                label: { fieldName: 'Name' },
                target: '_blank'
            },
            wrapText: true,
            sortable: true
        },
        {
            label: 'Industry',
            fieldName: 'Industry',
            type: 'text',
            wrapText: true,
            sortable: true
        },
        {
            label: 'Annual Revenue',
            fieldName: 'AnnualRevenue',
            type: 'currency',
            cellAttributes:{alignment:'left'},
            wrapText: true,
            sortable: true
        },
        {
            label: 'No. of Employees',
            fieldName: 'NumberOfEmployees',
            type: 'text',
            wrapText: true,
            sortable: true
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'text',
            wrapText: true,
            sortable: true
        }
    ];

    @wire(getAccounts)
    allAccounts({ error, data }) {
        if (data) {
            let nameUrl;
            this.accountData = data.map(row => {
                nameUrl = this.baseUrl + 'account' + `/${row.Id}`;
                return { ...row, nameUrl };
            });
        } else if (error) {
            console.log('Table Error: ' + error.body.message);
        }
    }

    onHandleSort(event) {
        this.sortDirection = event.detail.sortDirection;
        this.sortBy = event.detail.fieldName;
        const cloneData = Object.assign([], this.accountData);
        cloneData.sort(this.sortedBy(this.sortBy, this.sortDirection === 'asc' ? 1 : -1));
        this.accountData = cloneData;
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