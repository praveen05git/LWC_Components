import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import CURRENT_USER_ACCOUNTID from '@salesforce/schema/User.AccountId';
import CURRENT_USER_ID from '@salesforce/user/Id';
import getAccountName from '@salesforce/apex/AccountsController.getAccountName';

export default class AccountTitleCustom extends LightningElement {
    @api recordId;
    @track accountName;
    @track accountId;
    @track accountRecord=[];

    @wire(getAccountName, { accountId: '$recordId' })
    wireAccountName({ error, data }) {
        if (data) {
            console.log('pk data '+JSON.stringify(data));
            //console.log('pk name '+JSON.stringify(data.account.Name));
            this.accountRecord = data;
            this.accountName = this.accountRecord[0].Name;
            console.log('pk name '+accountName);
        }
    }

    /*
    @wire(getRecord,{recordId: CURRENT_USER_ID, fields:[CURRENT_USER_ACCOUNTID]})
    wireuser({error,data}) {
        if(data) {
            this.accountId = data.fields.AccountId.value;
        }
    }
     */
}