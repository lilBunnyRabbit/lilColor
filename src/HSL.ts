import { RGB } from "./RGB";

export type HSLString = `hsl(${number}, ${number}%, ${number}%)` | `hsla(${number}, ${number}%, ${number}%, ${number})`;

export class HSL {
  private _h!: number;
  private _s!: number;
  private _l!: number;
  private _alpha!: number;

  constructor(h: number, s: number, l: number, alpha?: number) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.alpha = alpha;
  }

  // Getters & Setters

  get h() {
    return this._h;
  }

  set h(h: number) {
    if (isNaN(h) || h < 0 || h > 360) {
      throw new Error(`${HSL.name}: Invalid "h". The value must be between 0 and 360.`);
    } else this._h = h;
  }

  get s() {
    return this._s;
  }

  set s(s: number) {
    if (isNaN(s) || s < 0 || s > 1) {
      throw new Error(`${HSL.name}: Invalid "s". The value must be between 0 and 1.`);
    } else this._s = s;
  }

  get l() {
    return this._l;
  }

  set l(l: number) {
    if (isNaN(l) || l < 0 || l > 1) {
      throw new Error(`${HSL.name}: Invalid "l". The value must be between 0 and 1.`);
    } else this._l = l;
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(alpha: number | undefined) {
    if (alpha === undefined) {
      this._alpha = 1;
    } else {
      if (isNaN(alpha) || alpha < 0 || alpha > 1) {
        throw new Error(`${HSL.name}: Invalid "alpha". The value must be between 0 and 1.`);
      } else this._alpha = alpha;
    }
  }

  // Init

  static fromRGB(rgb: RGB): HSL {
    let { r, g, b } = rgb;

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    // Achromatic
    if (max === min) return new HSL(h, s, l, rgb.alpha);

    const diff = max - min;
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
      case r:
        h = (g - b) / diff + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / diff + 2;
        break;
      case b:
        h = (r - g) / diff + 4;
        break;
    }

    h /= 6;

    return new HSL(h, s, l, rgb.alpha);
  }

  // Operations

  public toString(withAlpha: boolean = false): HSLString {
    if (withAlpha) return `hsla(${this.h}, ${this.s * 100}%, ${this.l * 100}%, ${this.alpha})`;
    return `hsl(${this.h}, ${this.s * 100}%, ${this.l * 100}%)`;
  }
}
