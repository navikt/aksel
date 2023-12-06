import { partitionFiles } from "./partition-files";

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
    const { acceptedFiles, rejectedFiles } = partitionFiles(files);

    expect(acceptedFiles.length).toBe(2);
    expect(rejectedFiles.length).toBe(0);
  });

  test("rejects all files when accept parameter is empty", () => {
    const files = [createTxtFile(), createCsvFile()];
    const { acceptedFiles, rejectedFiles } = partitionFiles(files, "");

    expect(acceptedFiles.length).toBe(0);
    expect(rejectedFiles.length).toBe(2);
  });

  test("rejects file that does not match accept parameter", () => {
    const txtFileName = "foo.txt";
    const csvFileName = "bar.csv";
    const files = [createTxtFile(txtFileName), createCsvFile(csvFileName)];
    const { acceptedFiles, rejectedFiles } = partitionFiles(files, ".txt");

    expect(acceptedFiles.length).toBe(1);
    expect(rejectedFiles.length).toBe(1);
    expect(acceptedFiles[0].name).toBe(txtFileName);
    expect(rejectedFiles[0].name).toBe(csvFileName);
  });

  test("rejects file that does not pass validator", () => {
    const txtFileName = "foo.txt";
    const csvFileName = "bar.csv";
    const csvFile = createCsvFile(csvFileName);
    const txtFile = createTxtFile(txtFileName);
    const files = [txtFile, csvFile];
    const validator = (file: File) => file.name === txtFile.name;
    const { acceptedFiles, rejectedFiles } = partitionFiles(
      files,
      undefined,
      validator
    );

    expect(acceptedFiles.length).toBe(1);
    expect(rejectedFiles.length).toBe(1);
    expect(acceptedFiles[0].name).toBe(txtFileName);
    expect(rejectedFiles[0].name).toBe(csvFileName);
  });

  test("rejects file that passes accept parameter but does not pass validator", () => {
    const txtFileName = "foo.txt";
    const csvFileName = "bar.csv";
    const csvFile = createCsvFile(csvFileName);
    const txtFile = createTxtFile(txtFileName);
    const files = [txtFile, csvFile];
    const validator = (file: File) => file.name === txtFile.name;
    const { acceptedFiles, rejectedFiles } = partitionFiles(
      files,
      ".txt, .csv",
      validator
    );

    expect(acceptedFiles.length).toBe(1);
    expect(rejectedFiles.length).toBe(1);
    expect(acceptedFiles[0].name).toBe(txtFileName);
    expect(rejectedFiles[0].name).toBe(csvFileName);
  });

  test("rejects file that passes validator but does not pass accept parameter", () => {
    const txtFileName = "foo.txt";
    const csvFileName = "bar.csv";
    const csvFile = createCsvFile(csvFileName);
    const txtFile = createTxtFile(txtFileName);
    const files = [txtFile, csvFile];
    const validator = (file: File) =>
      file.name === csvFile.name || file.name === txtFile.name;
    const { acceptedFiles, rejectedFiles } = partitionFiles(
      files,
      ".csv",
      validator
    );

    expect(acceptedFiles.length).toBe(1);
    expect(rejectedFiles.length).toBe(1);
    expect(acceptedFiles[0].name).toBe(csvFileName);
    expect(rejectedFiles[0].name).toBe(txtFileName);
  });
});
