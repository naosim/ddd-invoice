import { YearMonth, YearMonthRange } from "../../utils.ts";

/**
 * コース
 */
export class Course {
  constructor(private readonly activeRange: YearMonthRange) {}

  isInCourse(yearMonth: YearMonth): boolean {
    return this.activeRange.isInRange(yearMonth);
  }
}
