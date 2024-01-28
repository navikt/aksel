import { acceptedSize } from "./is-accepted-size";

describe("acceptedSize", () => {
  it("should return true if maxSize is less than or equal to 0", () => {
    const file = new File([new Array(5000).join("a")], "filename.txt", {
      type: "text/plain",
    });
    expect(acceptedSize(file, -1)).toBe(true);
    expect(acceptedSize(file, 0)).toBe(true);
  });

  it("should return true if file size is less than or equal to maxSize", () => {
    const file = new File([new Array(5000).join("a")], "filename.txt", {
      type: "text/plain",
    });
    expect(acceptedSize(file, 5000)).toBe(true);
    expect(acceptedSize(file, 6000)).toBe(true);
  });

  it("should return false if file size is greater than maxSize", () => {
    const file = new File([new Array(5000).join("a")], "filename.txt", {
      type: "text/plain",
    });
    expect(acceptedSize(file, 4000)).toBe(false);
  });
});
