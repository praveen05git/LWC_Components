import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

export default class NavigationBarCustom extends NavigationMixin(LightningElement) {
    @api linkLabel01;
    @api pageApiName01;
    @api linkLabel02;
    @api pageApiName02;

    @wire(CurrentPageReference) pageRef;

    get navigationLinks() {
        let links = [
            { label: this.linkLabel01, link: this.pageApiName01, class: this.linkClasses(this.pageApiName01) },
            { label: this.linkLabel02, link: this.pageApiName02, class: this.linkClasses(this.pageApiName02) }
        ]

        links = links.filter((item) => {
            return item;
        })
        //only return links that has both link and label
        return links.filter(x => (x.link && x.label))
    }

    linkClasses(pageApiName) {
        //Assign css class active when on current page
        return this.pageRef.attributes.name === pageApiName ? 'active' : '';
    }

    navigateToPage(event) {
        event.preventDefault();
        const pageApiName = event.target.dataset.href;
        const pageReferenceObject = {
            type: 'comm__namedPage',
            attributes: {
                name: pageApiName
            }
        };
        this[NavigationMixin.Navigate](pageReferenceObject);
    }
}