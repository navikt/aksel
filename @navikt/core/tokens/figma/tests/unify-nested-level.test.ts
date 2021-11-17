import unifyNestedLevel from "../unify-nested-level";

describe("Check unifying of nested levels", () => {
  test("Check color nesting", () => {
    const obj = {
      "navds-global-color-green-50": { value: "rbga(0,1,0,0)" },
      "navds-global-color-green-500": { value: "rbga(0,2,0,0)" },
      "navds-semantic-color-primary-hover": {
        value: "rbga(0,3,0,0)",
      },
      "navds-semantic-color-primary-hover-subtle": {
        value: "rbga(0,4,0,0)",
      },
      "navds-semantic-color-danger": { value: "rbga(0,5,0,0)" },
      "navds-semantic-color-danger-hover": {
        value: "rbga(0,6,0,0)",
      },
      "navds-semantic-color-danger-hover-subtle": {
        value: "rbga(0,7,0,0)",
      },
    };

    const newObj = unifyNestedLevel(obj);

    expect(newObj).toEqual({
      "navds-global-color-green-50": { value: "rbga(0,1,0,0)" },
      "navds-global-color-green-500": { value: "rbga(0,2,0,0)" },
      "navds-semantic-color-primary-hover-@": {
        value: "rbga(0,3,0,0)",
      },
      "navds-semantic-color-primary-hover-subtle": {
        value: "rbga(0,4,0,0)",
      },
      "navds-semantic-color-danger-@-@": { value: "rbga(0,5,0,0)" },
      "navds-semantic-color-danger-hover-@": {
        value: "rbga(0,6,0,0)",
      },
      "navds-semantic-color-danger-hover-subtle": {
        value: "rbga(0,7,0,0)",
      },
    });
  });
});
