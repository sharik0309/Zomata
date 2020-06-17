global class ZomatoRestAPI {
     
  @AuraEnabled
  public static string getLocation(String location) {

     Http http = new Http();
     HttpRequest request = new HttpRequest();
     String url = 'https://developers.zomato.com/api/v2.1/locations';
     url += '?query='+location;
     
     request.setEndpoint(url);
     request.setHeader('Content-Type', 'application/json');
     request.setHeader('user-key', '7e914f7ea6e907101bda7e32649da02d');
     request.setMethod('GET');

     HttpResponse response =  http.send(request);
     System.debug('getLocation Response---'+response.getBody());
     System.debug('Response Code---'+response.getStatusCode()); 
   
     return response.getBody();

  }

  @AuraEnabled
  public static string getRestuarants(String entityId, String entityType, String searchStr) {

     Http http = new Http();
     HttpRequest request = new HttpRequest();
     String url = 'https://developers.zomato.com/api/v2.1/search';
     url += '?entity_id='+ entityId;
     url += '&entity_type='+ entityType;
     url += '&q='+searchStr;
     System.debug('Url-'+url);
     request.setEndpoint(url);
     request.setHeader('Content-Type', 'application/json');
     request.setHeader('user-key', '7e914f7ea6e907101bda7e32649da02d');
     request.setMethod('GET');

     HttpResponse response =  http.send(request);
     System.debug('getRestuarants Response---'+response.getBody());
     System.debug('Response Code---'+response.getStatusCode()); 
   
     return response.getBody();

  }

  @AuraEnabled
  public static string getReview(String RestId) {

     Http http = new Http();
     HttpRequest request = new HttpRequest();
     String url = 'https://developers.zomato.com/api/v2.1/reviews';
     url += '?res_id='+RestId;

     
     request.setEndpoint(url);
     request.setHeader('Content-Type', 'application/json');
     request.setHeader('user-key', '7e914f7ea6e907101bda7e32649da02d');
     request.setMethod('GET');

     HttpResponse response =  http.send(request);
     System.debug('getReview Response---'+response.getBody());
     System.debug('Response Code---'+response.getStatusCode()); 
   
     return response.getBody();

  }

}