public class S1LookUpController {
    /**
    * @descp: Search Contact by keyword "q" and LIMIT loadMoreNumb
    * @param String q
    * @param Integer loadMoreNumb
    * @result List<Contact> 
    **/
    @AuraEnabled
    public static List<Contact> searchContact( String q, Integer loadMoreNumb ){
        return [SELECT Id, Name, Account.Name FROM Contact 
                WHERE Name LIKE : q+'%' 
                OR FirstName LIKE : q+'%' 
                OR  LastName LIKE : q+'%' ORDER BY Name ASC LIMIT : Integer.valueOf( loadMoreNumb )]; 
    }  
    /**
    * @descp: Get contact record by contact Id "contactId" to be asociated to Task record
    * @param String contactId
    * @result Contact 
    **/
    @AuraEnabled
    public static Contact selectedContact( String contactId ){
        List<Contact> cList = [SELECT Id, Name, Contact_Frequency__c, Potential__c, Relationship_Strength__c 
                               FROM Contact WHERE Id = :contactId LIMIT 1];
		return cList.get(0);
    }
}