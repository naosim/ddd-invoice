import { YearMonth } from "../../../utils.ts";
import { Course } from "../course.ts";
import { Member } from "../member.ts";

/**
 * 会員とコース
 */
 export class MemberAndCourse {
  constructor(private readonly member: Member, private readonly course: Course) {}
  isActive(yearMonth: YearMonth) {
    return this.member.isActive(yearMonth) && this.course.isInCourse(yearMonth);
  }
}