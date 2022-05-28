import { Invoice } from "../../../../m/invoice.ts";
import { MemberAndCourse } from "../../../memberAndCourse/MemberAndCourse.ts";
import { TelMonthlyFeeInvoiceCode } from "./TelMonthlyFeeInvoiceCode.ts";
import { TelMonthlyFee } from "../TelMonthlyFee.ts";

/**
 * 電話月額課金条件
 */
export class TelMonthlyFeeRequirement {
  constructor(
    private readonly invoice: Invoice,
    private readonly memberAndCourse: MemberAndCourse
  ) {}
  shouldCharge(): boolean {
    if(!TelMonthlyFeeInvoiceCode.isTelMonthlyFee(this.invoice)) {
      return false;
    }

    if(!this.memberAndCourse.isActive(this.invoice.useYearMonth)) {
      return false;
    }

    return true;
  }

  createMonthlyFee(): TelMonthlyFee {
    if(!this.shouldCharge()) {
      throw new Error("課金不可");
    }
    return new TelMonthlyFee(this.invoice.useYearMonth);
  }

}
