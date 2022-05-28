import { YearMonth } from "../../../../utils.ts";

/**
 * テレビ月額課金
 */
export class TvMonthlyFee {
  /**
   * 
   * @param useYearMonth 利用月
   */
  constructor(private readonly useYearMonth: YearMonth) {}
}