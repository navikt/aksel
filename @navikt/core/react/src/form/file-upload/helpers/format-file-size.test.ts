import { formatFileSize } from "./format-file-size";

describe("format-file-size", () => {
  describe("with native File", () => {
    it('returns "0,01 MB" when file size is less than 0,01 MB', () => {
      const file = new File(["abc"], "file.txt");

      expect(formatFileSize(file)).toBe("0,01 MB");
    });

    it('returns "0,29 MB" when file size is 0,29 MB', () => {
      const file = new File(["abc".repeat(99_999)], "file.txt");

      expect(formatFileSize(file)).toBe("0,29 MB");
    });

    it('returns "> 500 MB" when file size is more than 500 MB', () => {
      const file = createLargeMockFile(600_000_000);

      expect(formatFileSize(file)).toBe("> 500 MB");
    });
  });

  describe("with MetadataFile", () => {
    it("returns null when file size is undefined", () => {
      const file = {
        name: "myfile.txt",
      };

      expect(formatFileSize(file)).toBeNull();
    });
    it('returns "0,01 MB" when file size is less than 0,01 MB', () => {
      const file = {
        name: "myfile.txt",
        size: 1,
      };

      expect(formatFileSize(file)).toBe("0,01 MB");
    });

    it('returns "0,96 MB" when file size is 0,96 MB', () => {
      const file = {
        name: "myfile.txt",
        size: 999_999,
      };

      expect(formatFileSize(file)).toBe("0,96 MB");
    });

    it('returns "> 500 MB" when file size is more than 500 MB', () => {
      const file = {
        name: "myfile.txt",
        size: 600_000_000,
      };

      expect(formatFileSize(file)).toBe("> 500 MB");
    });
  });
});

function createLargeMockFile(sizeInBytes: number): File {
  const chunkSize = 1024 * 1024; // 1MB chunk size
  const chunks: ArrayBuffer[] = [];

  for (let i = 0; i < sizeInBytes; i += chunkSize) {
    const size = Math.min(chunkSize, sizeInBytes - i);
    const chunk = new Uint8Array(size);
    chunk.fill("a".charCodeAt(0));
    chunks.push(chunk.buffer);
  }

  const blob = new Blob(chunks, { type: "text/plain" });
  return new File([blob], "largeMockFile.txt", {
    type: "text/plain",
  });
}
