import { HSL } from "./HSL";

export type RGBString = `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})`;

export class RGB {
  private _r!: number;
  private _g!: number;
  private _b!: number;
  private _alpha!: number;

  constructor(r: number, g: number, b: number, alpha?: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;
  }

  // Getters & Setters

  get r() {
    return this._r;
  }

  set r(r: number) {
    if (isNaN(r) || r < 0 || r > 255) {
      throw new Error(`${RGB.name}: Invalid "r". The value must be between 0 and 255.`);
    } else this._r = r;
  }

  get g() {
    return this._g;
  }

  set g(g: number) {
    if (isNaN(g) || g < 0 || g > 255) {
      throw new Error(`${RGB.name}: Invalid "g". The value must be between 0 and 255.`);
    } else this._g = g;
  }

  get b() {
    return this._b;
  }

  set b(b: number) {
    if (isNaN(b) || b < 0 || b > 255) {
      throw new Error(`${RGB.name}: Invalid "b". The value must be between 0 and 255.`);
    } else this._b = b;
  }

  get alpha() {
    return this._alpha;
  }

  set alpha(alpha: number | undefined) {
    if (alpha === undefined) {
      this._alpha = 1;
    } else {
      if (isNaN(alpha) || alpha < 0 || alpha > 1) {
        throw new Error(`${RGB.name}: Invalid "alpha". The value must be between 0 and 1.`);
      } else this._alpha = alpha;
    }
  }

  // Init

  static fromHSL(hsl: HSL): RGB {
    const { h, s, l } = hsl;

    const hue2rgb = (p: number, q: number, t: number) => {
      return Math.round(
        (() => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        })() * 255
      );
    };

    if (s == 0) new RGB(l, l, l, hsl.alpha);

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return new RGB(hue2rgb(p, q, h + 1 / 3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1 / 3), hsl.alpha);
  }

  // Operations

  public toString(withAlpha: boolean = false): RGBString {
    if (withAlpha) return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}
