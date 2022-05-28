import { YearMonth } from "../../utils.ts";

/**
 * 請求明細
 */
export class Invoice {
  /**
   * 
   * @param code 請求内訳コード
   * @param useYearMonth 利用月
   */
  constructor(
    readonly code: InvoiceCode,
    readonly useYearMonth: YearMonth
  ) {}

}

/**
 * 請求明細内訳コード
 */
export class InvoiceCode {
  constructor(readonly value: string) {}
}


