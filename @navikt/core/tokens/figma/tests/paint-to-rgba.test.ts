import { PaintType } from "figma-api";
import paintToRgba from "../paint-to-rgba";

describe("parse-color", () => {
  test("white", () => {
    expect(
      paintToRgba({
        type: PaintType.SOLID,
        color: {
          r: 1,
          g: 1,
          b: 1,
          a: 1,
        },
      })
    ).toBe("rgba(255, 255, 255, 1)");
  });

  test("gray", () => {
    expect(
      paintToRgba({
        type: PaintType.SOLID,
        color: {
          r: 0.9725490212440491,
          g: 0.9725490212440491,
          b: 0.9725490212440491,
          a: 1,
        },
      })
    ).toBe("rgba(248, 248, 248, 1)");
  });

  test("transparent", () => {
    expect(
      paintToRgba({
        type: PaintType.SOLID,
        color: {
          r: 1,
          g: 1,
          b: 1,
          a: 1,
        },
        opacity: 0,
      })
    ).toBe("rgba(255, 255, 255, 0)");
  });

  test("partly transparent", () => {
    expect(
      paintToRgba({
        type: PaintType.SOLID,
        color: {
          r: 0.5208221077919006,
          g: 0.4344444274902344,
          b: 0.7666666507720947,
          a: 1,
        },
        opacity: 0.6899999976158142,
      })
    ).toBe("rgba(133, 111, 195, 0.69)");
  });
});
