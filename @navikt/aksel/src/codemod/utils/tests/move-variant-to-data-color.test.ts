import jscodeshift from "jscodeshift";
import { describe, expect, test } from "vitest";
import { moveVariantToDataColor } from "../move-variant-to-data-color";

const api = {
  j: jscodeshift.withParser("tsx"),
  jscodeshift: jscodeshift.withParser("tsx"),
  stats: () => {},
  report: () => {},
};

const config = {
  component: "TestComponent",
  prop: "variant",
  changes: {
    old: { replacement: "new", color: "blue" },
    remove: { color: "red" },
  },
};

const configSub = {
  component: "TestComponent.SubElement",
  prop: "variant",
  changes: {
    old: { replacement: "new", color: "blue" },
    remove: { color: "red" },
  },
};

function transform(source: string, subComponent = false) {
  return moveVariantToDataColor(
    { source, path: "test.tsx" },
    api,
    subComponent ? configSub : config,
  );
}

describe("moveVariantToDataColor", () => {
  test("should ignore files without the component import", () => {
    const source = `import { Other } from "@navikt/ds-react"; <TestComponent variant="old" />`;
    expect(transform(source)).toBeNull();
  });

  test("should handle named imports", () => {
    const source = `import { TestComponent } from "@navikt/ds-react"; <TestComponent variant="old" />`;
    const expected = `import { TestComponent } from "@navikt/ds-react"; <TestComponent data-color="blue" variant="new" />`;
    expect(transform(source)).toBe(expected);
  });

  test("should handle aliased imports", () => {
    const source = `import { TestComponent as TC } from "@navikt/ds-react"; <TC variant="old" />`;
    const expected = `import { TestComponent as TC } from "@navikt/ds-react"; <TC data-color="blue" variant="new" />`;
    expect(transform(source)).toBe(expected);
  });

  test("should handle sub-components", () => {
    const source = `import { TestComponent } from "@navikt/ds-react"; <TestComponent.SubElement variant="old" />`;
    const expected = `import { TestComponent } from "@navikt/ds-react"; <TestComponent.SubElement data-color="blue" variant="new" />`;
    expect(transform(source, true)).toBe(expected);
  });

  test("should replace variant with replacement", () => {
    const source = `import { TestComponent } from "@navikt/ds-react"; <TestComponent variant="old" />`;
    const expected = `import { TestComponent } from "@navikt/ds-react"; <TestComponent data-color="blue" variant="new" />`;
    expect(transform(source)).toBe(expected);
  });

  test("should remove variant if no replacement", () => {
    const source = `import { TestComponent } from "@navikt/ds-react"; <TestComponent variant="remove" />`;
    const expected = `import { TestComponent } from "@navikt/ds-react"; <TestComponent data-color="red" />`;
    expect(transform(source)).toBe(expected);
  });

  test("should not add data-color if it already exists", () => {
    const source = `import { TestComponent } from "@navikt/ds-react"; <TestComponent data-color="existing" variant="old" />`;
    const expected = `import { TestComponent } from "@navikt/ds-react"; <TestComponent data-color="existing" variant="new" />`;
    expect(transform(source)).toBe(expected);
  });

  test("should handle JSX expression containers", () => {
    const source = `import { TestComponent } from "@navikt/ds-react"; <TestComponent variant={"old"} />`;
    const expected = `import { TestComponent } from "@navikt/ds-react"; <TestComponent data-color="blue" variant={"new"} />`;
    expect(transform(source)).toBe(expected);
  });

  test("should ignore unknown variants", () => {
    const source = `import { TestComponent } from "@navikt/ds-react"; <TestComponent variant="unknown" />`;
    expect(transform(source)).toBe(source);
  });
});
