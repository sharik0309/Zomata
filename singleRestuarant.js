import { LightningElement,api,wire } from 'lwc';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class SingleRestuarant extends LightningElement {

    @api rest;
    
    @wire (CurrentPageReference) pageRef;

  
    handleRestaurantSelected(){
        console.log('single rest-',this.rest);
     fireEvent(this.pageRef,'RestDetails', this.rest);
    }

}