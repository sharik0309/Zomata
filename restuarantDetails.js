import { LightningElement,wire,track } from 'lwc';
import {registerListener,unregisterAllListeners} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import getReview from '@salesforce/apex/ZomatoRestAPI.getReview';


export default class RestuarantDetails extends LightningElement {

    rest;
    displayRestaurant = false;
    restName='';
    viewGallery = false;
    viewMap = false;
    review;
    restId;
    viewReview= false;

  
    @track mapMarkers = [];

    @wire (CurrentPageReference) pageRef;

    connectedCallback() {
        //called from singleRestuarant Comp
        registerListener('RestDetails', this.handleMessage, this);
    }

    handleMessage(eventValue) {
        console.log('handleMessage',JSON.stringify(eventValue));
        
        this.viewGallery = false;
        this.viewMap = false;
        this.rest = JSON.parse(JSON.stringify(eventValue));
        this.displayRestaurant = true;
        this.restId =  this.rest.restaurant.R.res_id;
        console.log(this.restId);
        console.log('Rest',JSON.stringify(this.rest.restaurant));
        
        this.mapMarkers = [{
            location: {
               'PostalCode': JSON.stringify(this.rest.restaurant.location.zipcode),
              'Street': JSON.stringify(this.rest.restaurant.location.address),
               
            }
        }];
         
    }
    
    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    onClickGallery (){
        if(this.viewGallery) {
            this.viewGallery = false;
        } else {
            console.log('gall',JSON.stringify(this.rest.restaurant.photos));

            this.viewGallery = true;
            this.viewMap = false;
            this.viewReview= false;

        }

    }

    onClickMap(){
        if(this.viewMap) {
            this.viewMap = false;
        } else {
             this.viewMap = true;
             this.viewGallery = false;
             this.viewReview= false;
        }

    }

    onClickReviews(){ 
        console.log('Rest Id--'+ this.restId);
        getReview({ RestId : this.restId})
        .then(result=>{
            this.review = JSON.parse(result);
            if (this.viewReview) {
                this.viewReview= false;
            } else this.viewReview= true;
   
        }).catch(error=>{
            console.log('Error--'+ JSON.stringify(error));
        })    

    }
 
}