import file from "./file.json";
import fileStyles from "./file-styles.json";
import getFileStyles from "../file-styles";

test("get file styles", () => {
  expect(getFileStyles(file, fileStyles)).toEqual({
    colors: {
      "test-color-style": "rgba(196, 196, 196, 1)",
      "stroke-color-style": "rgba(84, 138, 83, 1)",
      "stroke-color-style-2": "rgba(133, 111, 195, 0.69)",
      "red-see-through": "rgba(219, 16, 16, 0.33)",
    },
    textStyles: {
      "test-text-style": {
        fontFamily: "Roboto",
        fontPostScriptName: null,
        fontWeight: 400,
        textAutoResize: "WIDTH_AND_HEIGHT",
        fontSize: 12,
        textAlignHorizontal: "LEFT",
        textAlignVertical: "TOP",
        letterSpacing: 0,
        lineHeightPx: 20,
        lineHeightPercent: 142.22222900390625,
        lineHeightPercentFontSize: 166.6666717529297,
        lineHeightUnit: "PIXELS",
      },
    },
  });
});
