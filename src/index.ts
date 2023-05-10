import { HSL } from "./HSL";
import { RGB } from "./RGB";

export type HexValue = `${number | string}${number | string}`;
export type HexString = `#${HexValue}${HexValue}${HexValue}` | `#${HexValue}${HexValue}${HexValue}${HexValue}`;

export class Color {
  private _rgb!: RGB;

  constructor(rgb: RGB) {
    this._rgb = rgb;
  }

  get rgb(): RGB {
    return this._rgb;
  }

  set rgb(rgb: RGB) {
    this._rgb = rgb;
  }

  get hsl(): HSL {
    return HSL.fromRGB(this.rgb);
  }

  get hex(): HexString {
    const { r, g, b, alpha } = this.rgb;

    const toHex = (value: number) => value.toString(16).padStart(2, "0");

    let hex: HexString = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    if (alpha < 1) hex += toHex(Math.round(alpha * 255));

    return hex;
  }

  static fromRGB(...args: ConstructorParameters<typeof RGB>): Color {
    return new Color(new RGB(...args));
  }

  static fromHex(hex: HexString): Color {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    let alpha = parseInt(hex.substring(7, 9), 16);
    if (isNaN(alpha)) alpha = 1;
    else alpha /= 255;

    return Color.fromRGB(r, g, b, alpha);
  }

  static fromHSL(...args: ConstructorParameters<typeof HSL>): Color {
    return new Color(RGB.fromHSL(new HSL(...args)));
  }

  public clone(): Color {
    return new Color(new RGB(this.rgb.r, this.rgb.g, this.rgb.b, this.rgb.alpha));
  }
}
