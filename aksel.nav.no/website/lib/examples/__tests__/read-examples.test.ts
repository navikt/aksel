import { getExampleFiles } from "../get-example-files";
import {
  filterCode,
  getDesc,
  getIndex,
  readExampleFile,
  readExampleFiles,
} from "../read-example-files";

const d = `import { Button } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return <Button>Primary</Button>;
};`;

const testStr1 = `${d}

export default withDsExample(Example);

export const args = {
  index: 0,
  desc: "description-text"
};`;

const testStr2 = `${d}

export default withDsExample(Example);

export const args = {
};`;

const testStr3 = `${d}

export default withDsExample(Example);
`;

const codeRes = `import { Button } from "@navikt/ds-react";

const Example = () => {
  return <Button>Primary</Button>;
};`;

describe("Reading code-examples", () => {
  test("getDesc", () => {
    expect(getDesc(testStr1)).toEqual("description-text");
    expect(getDesc(testStr2)).toBeNull();
    expect(getDesc(testStr3)).toBeNull();
  });

  test("getIndex", () => {
    expect(getIndex(testStr1)).toEqual(0);
    expect(getIndex(testStr2)).toEqual(1);
    expect(getIndex(testStr3)).toEqual(1);
  });

  test("filterCode", () => {
    expect(filterCode(testStr1)).toEqual(codeRes);
  });

  test("readExampleFiles", () => {
    const files = getExampleFiles();
    expect(readExampleFiles(files[0].path.split("/")[0])).toBeTruthy();
  });

  test("readExampleFile", () => {
    const files = getExampleFiles();
    expect(readExampleFile(files[0].path)).toBeTruthy();
  });
});

export {};
