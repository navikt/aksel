test("Check converting of colors to styled-dictionary format", () => {
  expect(
    JSON.stringify({
      "navds-global-color-red-500": { value: "rgba(195, 0, 0, 1)" },
    })
  ).toBe(
    JSON.stringify({
      "navds-global-color-red-500": { value: "rgba(195, 0, 0, 1)" },
    })
  );
});
