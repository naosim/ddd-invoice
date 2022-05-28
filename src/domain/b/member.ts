import { YearMonth, YearMonthRange } from "../../utils.ts";

/**
 * 会員
 */
export class Member {
  constructor(private readonly activeRange: YearMonthRange) {}

  isActive(yearMonth: YearMonth): boolean {
    return this.activeRange.isInRange(yearMonth);
  }
}