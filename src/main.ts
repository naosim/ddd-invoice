import { Course } from "./domain/b/course.ts";
import { Member } from "./domain/b/member.ts";
import { MemberAndCourse } from "./domain/b/memberAndCourse/MemberAndCourse.ts";
import { TelMonthlyFeeRequirement } from "./domain/b/monthlyfee/tel/requirement/TelMonthlyFeeRequirement.ts";
import { TvMonthlyFeeRequirement } from "./domain/b/monthlyfee/tv/requirement/TvMonthlyFeeRequirement.ts";
import {Invoice, InvoiceCode} from "./domain/m/invoice.ts"
import { UseYearMonth } from "./domain/m/UseYearMonth.ts";
import { YearMonth, YearMonthRange } from "./utils.ts";

const invoices: Invoice[] = `
テレビほげー
あれ
それ
これ
`.trim().split('\n').map(v => new Invoice(new InvoiceCode(v), new UseYearMonth(new YearMonth("2022/4"))));

const memberAndCourse = new MemberAndCourse(
  new Member(YearMonthRange.create("2020/1", "2022/4")),
  new Course(YearMonthRange.create("2019/1", "2022/4"))
)



invoices.map(invoice => new TvMonthlyFeeRequirement(invoice, memberAndCourse)).filter(v => v.shouldCharge()).map(v => v.createMonthlyFee())
invoices.map(invoice => new TelMonthlyFeeRequirement(invoice, memberAndCourse)).filter(v => v.shouldCharge()).map(v => v.createMonthlyFee())