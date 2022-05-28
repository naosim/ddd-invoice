export class YearMonth {
  readonly dateValue: Date;
  /**
   * 
   * @param value yyyy/mm
   */
  constructor(readonly value: string) {
    this.dateValue = new Date(value + "/1");
  }

  get year(): number {
    return this.dateValue.getFullYear();
  }
  
  get month(): number {
    return this.dateValue.getMonth() + 1;
  }

  isAfter(other: YearMonth) {
    if(this.year > other.year) {
      return true;
    }
    if(this.year < other.year) {
      return false;
    }

    if(this.month > this.month) {
      return true;
    }
    if(this.month < this.month) {
      return false;
    }

    return false;
  }

  isAfterOrSame(other: YearMonth) {
    return this.isAfter(other) || this.eq(other);
  }

  isBefore(other: YearMonth) {
    const b = this.isAfter(other);
    if(b) {
      return false;
    }
    return !this.eq(other);
  }

  isBeforeOrSame(other: YearMonth) {
    return this.isBefore(other) || this.eq(other);
  }

  eq(other: YearMonth): boolean {
    return this.value == other.value;
  }
}

export class YearMonthRange {
  constructor(readonly startYearMonth: YearMonth, readonly endYearMonth: YearMonth) {}
  isInRange(yearMonth: YearMonth): boolean {
    return yearMonth.isAfterOrSame(this.startYearMonth) && yearMonth.isBeforeOrSame(this.endYearMonth)
  }

  static create(
    startYearMonth: string, 
    endYearMonth: string
  ): YearMonthRange {
    return new YearMonthRange(new YearMonth(startYearMonth), new YearMonth(endYearMonth));
  }
}

export interface Option<T> {
  map<S>(func:(v:T)=>S):Option<S>
}

export class OptionFactory {
  static ofNullable<T>(value: T|undefined|null): Option<T> {
    if(value === undefined || value === null) {
      return None.none()
    }
    return Some.of(value);
  }
  static none<T>(): Option<T> {
    return None.none();
  }
  static of<T>(value: T) {
    return Some.of(value);
  }
}

class None<T> implements Option<T> {
  static none<T>(): None<T> {
    return new None<T>();
  }
  map<S>(func:(v:T)=>S):Option<S> {
    return None.none();
  }
}

class Some<T> implements Option<T> {
  constructor(readonly value: T) {
  }

  map<S>(func:(v:T)=>S|null|undefined):Option<S> {
    return OptionFactory.ofNullable(func(this.value));
  }

  static of<T>(value: T) {
    return new Some<T>(value);
  }
}