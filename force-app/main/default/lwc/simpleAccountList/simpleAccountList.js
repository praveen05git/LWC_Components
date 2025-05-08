import { LightningElement, wire, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountsController.getAllAccounts';

export default class SimpleAccountList extends LightningElement {
    accountData;
    @track listViewColumns = [
        {
            label: 'Account Name',
            fieldName: 'Name',
            type: 'text'
        },
        {
            label: 'Industry',
            fieldName: 'Industry',
            type: 'text'
        },
        {
            label: 'Annual Revenue',
            fieldName: 'AnnualRevenue',
            type: 'currency'
        },
        {
            label: 'No. of Employees',
            fieldName: 'NumberOfEmployees',
            type: 'text'
        },
        {
            label: 'Phone',
            fieldName: 'Phone',
            type: 'text'
        }
    ];

    @wire(getAccounts)
    allAccounts({ error, data }) {
        if (data) {
            this.accountData = data;
        } else if (error) {
            console.log('Table Error: ' + error.body.message);
        }
    }
}