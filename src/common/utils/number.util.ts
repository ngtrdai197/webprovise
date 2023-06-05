import BigNumber from 'bignumber.js';

export class NumberUtil {
  public static add(a: string, b: string): string {
    return new BigNumber(a).plus(b).toString();
  }

  public static sub(a: string, b: string): string {
    return new BigNumber(a).minus(b).toString();
  }

  public static mul(a: string, b: string): string {
    return new BigNumber(a).multipliedBy(b).toString();
  }

  public static div(a: string, b: string): string {
    return new BigNumber(a).dividedBy(b).toString();
  }
}
