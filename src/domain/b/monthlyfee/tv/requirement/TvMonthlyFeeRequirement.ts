import { Invoice } from "../../../../m/invoice.ts";
import { MemberAndCourse } from "../../../memberAndCourse/MemberAndCourse.ts";
import { TvMonthlyFeeInvoiceCode } from "./TvMonthlyFeeInvoiceCode.ts";
import { TvMonthlyFee } from "../TvMonthlyFee.ts";

/**
 * テレビ月額課金条件
 */
export class TvMonthlyFeeRequirement {
  constructor(
    private readonly invoice: Invoice,
    private readonly memberAndCourse: MemberAndCourse
  ) {}
  shouldCharge(): boolean {
    if(!TvMonthlyFeeInvoiceCode.isTvMonthlyFee(this.invoice)) {
      return false;
    }

    if(!this.memberAndCourse.isActive(this.invoice.useYearMonth)) {
      return false;
    }

    return true;
  }

  createMonthlyFee(): TvMonthlyFee {
    if(!this.shouldCharge()) {
      throw new Error("課金不可");
    }
    return new TvMonthlyFee(this.invoice.useYearMonth);
  }

}
