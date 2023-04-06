public without sharing class AccountsController {
  @AuraEnabled(Cacheable=true)
  public static List<Account> getAllAccounts() {
    return [
      SELECT Name, Industry, AnnualRevenue, NumberOfEmployees, Phone
      FROM Account
      LIMIT 10
    ];
  }

  @AuraEnabled(Cacheable=true)
  public static List<Account> getAccountName(String accountId) {
    return [SELECT Name FROM Account WHERE Id = :accountId];
  }
}
