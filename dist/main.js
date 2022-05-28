// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

class Course {
    constructor(activeRange){
        this.activeRange = activeRange;
    }
    isInCourse(yearMonth) {
        return this.activeRange.isInRange(yearMonth);
    }
    activeRange;
}
class Member {
    constructor(activeRange){
        this.activeRange = activeRange;
    }
    isActive(yearMonth) {
        return this.activeRange.isInRange(yearMonth);
    }
    activeRange;
}
class MemberAndCourse {
    constructor(member, course){
        this.member = member;
        this.course = course;
    }
    isActive(yearMonth) {
        return this.member.isActive(yearMonth) && this.course.isInCourse(yearMonth);
    }
    member;
    course;
}
class TelMonthlyFeeInvoiceCode {
    static isTelMonthlyFee(invoice) {
        return invoice.code.value.indexOf("電話") != -1;
    }
}
class TelMonthlyFee {
    constructor(useYearMonth){
        this.useYearMonth = useYearMonth;
    }
    useYearMonth;
}
class TelMonthlyFeeRequirement {
    constructor(invoice, memberAndCourse1){
        this.invoice = invoice;
        this.memberAndCourse = memberAndCourse1;
    }
    shouldCharge() {
        if (!TelMonthlyFeeInvoiceCode.isTelMonthlyFee(this.invoice)) {
            return false;
        }
        if (!this.memberAndCourse.isActive(this.invoice.useYearMonth.value)) {
            return false;
        }
        return true;
    }
    createMonthlyFee() {
        if (!this.shouldCharge()) {
            throw new Error("課金不可");
        }
        return new TelMonthlyFee(this.invoice.useYearMonth.value);
    }
    invoice;
    memberAndCourse;
}
class TvMonthlyFeeInvoiceCode {
    static isTvMonthlyFee(invoice) {
        return invoice.code.value.indexOf("テレビ") != -1;
    }
}
class TvMonthlyFee {
    constructor(useYearMonth){
        this.useYearMonth = useYearMonth;
    }
    useYearMonth;
}
class TvMonthlyFeeRequirement {
    constructor(invoice, memberAndCourse2){
        this.invoice = invoice;
        this.memberAndCourse = memberAndCourse2;
    }
    shouldCharge() {
        if (!TvMonthlyFeeInvoiceCode.isTvMonthlyFee(this.invoice)) {
            return false;
        }
        if (!this.memberAndCourse.isActive(this.invoice.useYearMonth.value)) {
            return false;
        }
        return true;
    }
    createMonthlyFee() {
        if (!this.shouldCharge()) {
            throw new Error("課金不可");
        }
        return new TvMonthlyFee(this.invoice.useYearMonth.value);
    }
    invoice;
    memberAndCourse;
}
class Invoice {
    constructor(code, useYearMonth){
        this.code = code;
        this.useYearMonth = useYearMonth;
    }
    code;
    useYearMonth;
}
class InvoiceCode {
    constructor(value){
        this.value = value;
    }
    value;
}
class UseYearMonth {
    constructor(value){
        this.value = value;
    }
    value;
}
class YearMonth {
    dateValue;
    constructor(value){
        this.value = value;
        this.dateValue = new Date(value + "/1");
    }
    get year() {
        return this.dateValue.getFullYear();
    }
    get month() {
        return this.dateValue.getMonth() + 1;
    }
    isAfter(other) {
        if (this.year > other.year) {
            return true;
        }
        if (this.year < other.year) {
            return false;
        }
        if (this.month > this.month) {
            return true;
        }
        if (this.month < this.month) {
            return false;
        }
        return false;
    }
    isAfterOrSame(other) {
        return this.isAfter(other) || this.eq(other);
    }
    isBefore(other) {
        const b = this.isAfter(other);
        if (b) {
            return false;
        }
        return !this.eq(other);
    }
    isBeforeOrSame(other) {
        return this.isBefore(other) || this.eq(other);
    }
    eq(other) {
        return this.value == other.value;
    }
    value;
}
class YearMonthRange {
    constructor(startYearMonth, endYearMonth){
        this.startYearMonth = startYearMonth;
        this.endYearMonth = endYearMonth;
    }
    isInRange(yearMonth) {
        return yearMonth.isAfterOrSame(this.startYearMonth) && yearMonth.isBeforeOrSame(this.endYearMonth);
    }
    static create(startYearMonth, endYearMonth) {
        return new YearMonthRange(new YearMonth(startYearMonth), new YearMonth(endYearMonth));
    }
    startYearMonth;
    endYearMonth;
}
class OptionFactory {
    static ofNullable(value) {
        if (value === undefined || value === null) {
            return None.none();
        }
        return Some.of(value);
    }
    static none() {
        return None.none();
    }
    static of(value) {
        return Some.of(value);
    }
}
class None {
    static none() {
        return new None();
    }
    map(func) {
        return None.none();
    }
}
class Some {
    constructor(value){
        this.value = value;
    }
    map(func) {
        return OptionFactory.ofNullable(func(this.value));
    }
    static of(value) {
        return new Some(value);
    }
    value;
}
const invoices = `
テレビほげー
あれ
それ
これ
`.trim().split('\n').map((v)=>new Invoice(new InvoiceCode(v), new UseYearMonth(new YearMonth("2022/4"))));
const memberAndCourse = new MemberAndCourse(new Member(YearMonthRange.create("2020/1", "2022/4")), new Course(YearMonthRange.create("2019/1", "2022/4")));
invoices.map((invoice)=>new TvMonthlyFeeRequirement(invoice, memberAndCourse)).filter((v)=>v.shouldCharge()).map((v)=>v.createMonthlyFee());
invoices.map((invoice)=>new TelMonthlyFeeRequirement(invoice, memberAndCourse)).filter((v)=>v.shouldCharge()).map((v)=>v.createMonthlyFee());
