public without sharing class PaymentsController {
  @AuraEnabled(Cacheable=true)
  public static List<Payment> getAllPayments(String filterStatus) {
    if (filterStatus == 'allPayments') {
      return getPayments();
    } else {
      return [
        SELECT PaymentNumber, AccountId, Amount, Status
        FROM Payment
        WHERE Status = :filterStatus
      ];
    }
  }

  @AuraEnabled(Cacheable=true)
  public static List<Payment> getPayments() {
    return [
      SELECT PaymentNumber, AccountId, Amount, Status
      FROM Payment
      LIMIT 10
    ];
  }
}
