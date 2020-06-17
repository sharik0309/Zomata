import { LightningElement,wire } from 'lwc';
import {registerListener,unregisterAllListeners} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class SearchRestuarants extends LightningElement {

    restaurantsList;
    restDetail;

    @wire (CurrentPageReference) pageRef;
 
    connectedCallback() {
        //called from SearchLocation Comp
        registerListener('restuarantList', this.handleMessage, this);
    }

    handleMessage(restuarantJSON) {
        console.log('Pubsub Handled');
        const tempList = [];
        for (var i in restuarantJSON.restaurants) {
            tempList.push(restuarantJSON.restaurants[i])
        }
       
        this.restaurantsList = tempList;

    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleCustomEvent(event) {
        console.log('CustomEvent')
        const restvalue = event.detail;
        this.restDetail = restvalue;
    }
}