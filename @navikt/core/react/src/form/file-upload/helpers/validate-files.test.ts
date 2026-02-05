import { validateFiles } from "./validate-files";

const createTxtFile = (name: string = "foo.txt") =>
  new File(["foo"], name, {
    type: "text/plain",
  });
const createCsvFile = (name: string = "bar.csv") =>
  new File(["abc,123"], name, {
    type: "text/csv",
  });

describe("partitionFiles", () => {
  test("accepts all files when accept parameter is undefined", () => {
    const files = [createTxtFile(), createCsvFile()];
    const {
      partitionedFiles: { accepted, rejected },
    } = validateFiles(files);

    expect(accepted.length).toBe(2);
    expect(rejected.length).toBe(0);
  });

  test("accepts all files when accept parameter is empty", () => {
    const files = [createTxtFile(), createCsvFile()];
    const {
      partitionedFiles: { accepted, rejected },
    } = validateFiles(files, "");

    expect(accepted.length).toBe(2);
    expect(rejected.length).toBe(0);
  });

  test("rejects file that does not match accept parameter", () => {
    const txtFileName = "foo.txt";
    const csvFileName = "bar.csv";
    const files = [createTxtFile(txtFileName), createCsvFile(csvFileName)];
    const {
      partitionedFiles: { accepted, rejected },
    } = validateFiles(files, ".txt");

    expect(accepted.length).toBe(1);
    expect(rejected.length).toBe(1);
    expect(accepted[0].name).toBe(txtFileName);
    expect(rejected[0].file.name).toBe(csvFileName);
  });

  test("rejects file that does not pass validator", () => {
    const txtFileName = "foo.txt";
    const csvFileName = "bar.csv";
    const csvFile = createCsvFile(csvFileName);
    const txtFile = createTxtFile(txtFileName);
    const files = [txtFile, csvFile];
    const validator = (file: File) => {
      if (file.name === txtFile.name) {
        return true;
      }
      return "custom validation error";
    };
    const {
      partitionedFiles: { accepted, rejected },
    } = validateFiles(files, undefined, validator);

    expect(accepted.length).toBe(1);
    expect(rejected.length).toBe(1);
    expect(accepted[0].name).toBe(txtFileName);
    expect(rejected[0].file.name).toBe(csvFileName);
    expect(rejected[0].reasons).toEqual(["custom validation error"]);
  });

  test("rejects file that passes accept parameter but does not pass validator", () => {
    const txtFileName = "foo.txt";
    const csvFileName = "bar.csv";
    const csvFile = createCsvFile(csvFileName);
    const txtFile = createTxtFile(txtFileName);
    const files = [txtFile, csvFile];
    const validator = (file: File) => {
      if (file.name === txtFile.name) {
        return true;
      }
      return "custom validation error";
    };
    const {
      partitionedFiles: { accepted, rejected },
    } = validateFiles(files, ".txt, .csv", validator);

    expect(accepted.length).toBe(1);
    expect(rejected.length).toBe(1);
    expect(accepted[0].name).toBe(txtFileName);
    expect(rejected[0].file.name).toBe(csvFileName);
  });

  test("rejects file that passes validator but does not pass accept parameter", () => {
    const txtFileName = "foo.txt";
    const csvFileName = "bar.csv";
    const csvFile = createCsvFile(csvFileName);
    const txtFile = createTxtFile(txtFileName);
    const files = [txtFile, csvFile];
    const validator = (file: File) => {
      if (file.name === csvFile.name || file.name === txtFile.name) {
        return true;
      }
      return "custom validation error";
    };
    const {
      partitionedFiles: { accepted, rejected },
    } = validateFiles(files, ".csv", validator);

    expect(accepted.length).toBe(1);
    expect(rejected.length).toBe(1);
    expect(accepted[0].name).toBe(csvFileName);
    expect(rejected[0].file.name).toBe(txtFileName);
    expect(rejected[0].reasons).toEqual(["fileType"]);
  });

  test("rejects file that is too large", () => {
    const txtFileName = "foo.txt";
    const csvFileName = "bar.csv";
    const csvFile = createCsvFile(csvFileName);
    const txtFile = createTxtFile(txtFileName);
    const files = [txtFile, csvFile];
    const maxSizeInBytes = 5;
    const {
      partitionedFiles: { accepted, rejected },
    } = validateFiles(files, undefined, undefined, maxSizeInBytes);

    expect(accepted.length).toBe(1);
    expect(rejected.length).toBe(1);
    expect(accepted[0].name).toBe(txtFileName);
    expect(rejected[0].file.name).toBe(csvFileName);
    expect(rejected[0].reasons).toEqual(["fileSize"]);
  });
});
