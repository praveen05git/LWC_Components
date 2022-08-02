import { LightningElement, wire, track } from 'lwc';
import getPayments from '@salesforce/apex/PaymentsController.getPayments';

export default class PaymentsWithRing extends LightningElement {
    @track paymentData;

    @track listViewColumns = [
        {
            label: 'Payment Number',
            fieldName: 'PaymentNumber',
            type: 'text',
            wrapText: true,
            sortable: true
        },
        {
            type: 'progressRing',
            fieldName: 'progressValue',
            label: '',
            initialWidth: 34,
            cellAttributes: {
                alignment: 'right'
            },
            hideDefaultActions: true
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

    @wire(getPayments)
    allPayments({ error, data }) {
        if (data) {
            let progressValue;
            this.paymentData = data.map(row => {
                progressValue = row.Amount
                return { ...row, progressValue };
            });
        } else if (error) {
            console.log('Table Error: ' + error.body.message);
        }
    }
}