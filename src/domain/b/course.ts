import { YearMonth, YearMonthRange } from "../../utils.ts";

/**
 * コース
 */
export class Course {
  constructor(readonly activeRange: YearMonthRange) {}

  isInCourse(yearMonth: YearMonth): boolean {
    return this.activeRange.isInRange(yearMonth);
  }
}
