public without sharing class PaymentsController {
    @AuraEnabled(Cacheable = true)
    public static List<Payment> getAllPayments(String filterStatus){
        return [select PaymentNumber,AccountId,Amount,Status from Payment where Status=:filterStatus];
    }

    @AuraEnabled(Cacheable = true)
    public static List<Payment> getPayments(){
        return [select PaymentNumber,AccountId,Amount,Status from Payment limit 10];
    }
}