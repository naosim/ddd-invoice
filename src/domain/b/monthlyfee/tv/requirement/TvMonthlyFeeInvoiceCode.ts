import { Invoice } from "../../../../m/invoice.ts";

/**
 * テレビ月額課金請求コード
 */

export class TvMonthlyFeeInvoiceCode {
  static isTvMonthlyFee(invoice: Invoice) {
    return invoice.code.value.indexOf("テレビ") != -1;
  }

}
