import { LightningElement, wire, track } from 'lwc';
import CURRENT_USER_ACCOUNTID from '@salesforce/schema/User.AccountId';
import CURRENT_USER_ID from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import getAccounts from '@salesforce/apex/AccountsController.getAllAccounts';

export default class AccountCustomList extends LightningElement {

    baseUrl = '/s/';
    accountData = [];
    @track sortBy;
    @track defaultSortDirection = 'asc';
    @track sortDirection = 'asc';
    dataForList = [];
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
            cellAttributes: { alignment: 'left' },
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
            this.dataForList = this.accountData;
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

    searchTable(event) {
        let searchFilter = event.target.value.toUpperCase();
        let tempArr = [];
        let i;
        this.accountData = this.dataForList;
        for (i = 0; i < this.accountData.length; i++) {
            if ((this.accountData[i].nameUrl && this.accountData[i].nameUrl.toUpperCase().indexOf(searchFilter) != -1) || (this.accountData[i].Industry && this.accountData[i].Industry.toUpperCase().indexOf(searchFilter) != -1)) {
                tempArr.push(this.accountData[i]);
            }
        }
        this.accountData = tempArr;
    }
}