import { PaintType } from "figma-api";
import paintToRgba from "../paint-to-rgba";

test("parse-color", () => {
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
