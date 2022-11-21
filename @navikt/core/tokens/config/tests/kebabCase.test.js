const kebabCase = require("../kebabCase");

describe("kebabCase", () => {
  [
    "foo bar",
    "Foo bar",
    "foo Bar",
    "Foo Bar",
    "FOO BAR",
    "fooBar",
    "--foo-bar--",
    "__foo_bar__",
  ].forEach((string) =>
    test(`${string} is converted to foo-bar`, () => {
      expect(kebabCase(string)).toBe("foo-bar");
    })
  );

  test(`spacing 3xl is converted to spacing-3xl`, () => {
    expect(kebabCase("spacing 3xl")).toBe("spacing-3xl");
  });

  test(`3xs is converted to 3xs`, () => {
    expect(kebabCase("3xs")).toBe("3xs");
  });
});
