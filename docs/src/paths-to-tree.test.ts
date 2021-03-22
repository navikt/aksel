import pathsToTree from "./paths-to-tree";

test("empty list", () => {
  expect(pathsToTree([])).toEqual([]);
});

test("single simple string", () => {
  expect(pathsToTree(["foo"])).toEqual([{ name: "foo" }]);
});

test("two levels", () => {
  expect(pathsToTree(["foo/bar"])).toEqual([
    {
      name: "foo",
      children: [{ name: "bar" }],
    },
  ]);
});

test("two levels, two strings", () => {
  expect(pathsToTree(["foo", "foo/bar"])).toEqual([
    {
      name: "foo",
      children: [{ name: "bar" }],
    },
  ]);
});

test("three levels, three strings", () => {
  expect(pathsToTree(["foo", "foo/bar/baz", "foo/bar"])).toEqual([
    {
      name: "foo",
      children: [
        {
          name: "bar",
          children: [{ name: "baz" }],
        },
      ],
    },
  ]);
});
