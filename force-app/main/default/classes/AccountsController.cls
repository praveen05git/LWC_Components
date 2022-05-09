public without sharing class AccountsController {
    @AuraEnabled(Cacheable = true)
    public static List<Account> getAllAccounts(){
        return [select Name,Industry,AnnualRevenue,NumberOfEmployees,Phone from Account limit 10];
    }
}