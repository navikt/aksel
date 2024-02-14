import { isAcceptedFileType } from "./is-accepted-file-type";

const txtFile = () =>
  new File(["foo"], "foo.txt", {
    type: "text/plain",
  });

describe("isAcceptedFileType", () => {
  test("returns true when accept is undefined", () => {
    expect(isAcceptedFileType(txtFile(), undefined)).toBe(true);
  });

  test("returns true when accept is empty string", () => {
    expect(isAcceptedFileType(txtFile(), "")).toBe(true);
  });

  test("returns true when file matches accepted extensions", () => {
    expect(isAcceptedFileType(txtFile(), ".txt, .pdf")).toBe(true);
  });

  test("works as expected when there is no space after comma in accept", () => {
    expect(isAcceptedFileType(txtFile(), ".txt,.pdf")).toBe(true);
  });

  test("returns false when file does not match the accepted extensions", () => {
    expect(isAcceptedFileType(txtFile(), ".xlsx, .pdf")).toBe(false);
  });

  test("returns true when file matches the accepted exact mime types", () => {
    expect(isAcceptedFileType(txtFile(), "application/pdf, text/plain")).toBe(
      true,
    );
  });

  test("returns false when file does not the accepted exact mime types", () => {
    expect(isAcceptedFileType(txtFile(), "application/pdf, text/csv")).toBe(
      false,
    );
  });

  test("returns true when file matches the accepted wildcard mime types", () => {
    expect(isAcceptedFileType(txtFile(), "application/*, text/*")).toBe(true);
  });

  test("returns false when file does not the accepted wildcard mime types", () => {
    expect(isAcceptedFileType(txtFile(), "application/*, image/*")).toBe(false);
  });

  test("returns true if matches extension, but not exact or wildcard mime type", () => {
    expect(
      isAcceptedFileType(txtFile(), "application/*, image/*, .txt, audio/mpeg"),
    ).toBe(true);
  });

  test("returns true if matches exact mime type, but not extension or wildcard mime type", () => {
    expect(
      isAcceptedFileType(
        txtFile(),
        "application/*, text/plain, .jpg, audio/mpeg",
      ),
    ).toBe(true);
  });

  test("returns true if matches wildcard mime type, but not extension or exact mime type", () => {
    expect(
      isAcceptedFileType(txtFile(), "application/*, text/*, .jpg, audio/mpeg"),
    ).toBe(true);
  });
});
