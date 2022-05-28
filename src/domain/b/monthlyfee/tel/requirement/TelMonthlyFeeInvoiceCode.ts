import {Invoice} from "../../../../m/invoice.ts"

/**
 * 電話月額課金請求コード
 */

export class TelMonthlyFeeInvoiceCode {
  static isTelMonthlyFee(invoice: Invoice) {
    return invoice.code.value.indexOf("電話") != -1;
  }

}
