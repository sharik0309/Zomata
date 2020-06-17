import { LightningElement,wire} from 'lwc';
import getLocation from '@salesforce/apex/ZomatoRestAPI.getLocation';
import getRestuarants from '@salesforce/apex/ZomatoRestAPI.getRestuarants';
import {fireEvent} from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';


export default class SearchLocation extends LightningElement {

    location;
    selectedLocation='';
    showErrorWindow = false;
    entityId = '';
    entityType;
    searchStr;

    @wire(CurrentPageReference) pageRef;

    onChangeLocationHandler(event) {
        this.location = event.target.value;
    }

    onChangeRestuarant(event) {
        this.searchStr = event.target.value;
    }

    onClickSearchHandler() {
        getLocation({location : this.location})   
        .then(response=>{
            console.log('Response--'+ response);
            const responseObj = JSON.parse(response);
            this.selectedLocation = responseObj.location_suggestions[0].title;
            this.entityId = responseObj.location_suggestions[0].entity_id;
            this.entityType = responseObj.location_suggestions[0].entity_type;
           
        }).catch(error=>{
            console.log('Error--'+ JSON.stringify(error));
        })    

        
    }

    onClickRestuarant () {
        console.log('entityId--'+ this.entityId);
        getRestuarants({entityId : this.entityId, entityType : this.entityType, searchStr : this.searchStr})
        .then(result=>{
            const responseObj = JSON.parse(result)
           fireEvent(this.pageRef,'restuarantList',responseObj);
        }).catch(error=>{
            console.log('Error--'+ JSON.stringify(error));
        })    

    }
}