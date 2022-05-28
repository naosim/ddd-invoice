import { YearMonth } from "../../../../utils.ts";

/**
 * 電話月額課金
 */
export class TelMonthlyFee {
  /**
   * 
   * @param useYearMonth 利用月
   */
  constructor(private readonly useYearMonth: YearMonth) {}
}

