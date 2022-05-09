public without sharing class PaymentsController {
    @AuraEnabled(Cacheable = true)
    public static List<Payment> getAllPayments(String filterStatus){
        return [select PaymentNumber,AccountId,Amount,Status from Payment where Status=:filterStatus];
    }
}