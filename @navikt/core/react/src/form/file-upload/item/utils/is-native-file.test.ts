import { isNativeFile } from "./is-native-file";

describe('is-native-file', () => {
  it('returns true when is native File', () => {
    const nativeFile = new File(["abc"], "file.txt")

    expect(isNativeFile(nativeFile)).toBe(true)
  })

  it('returns false when is native MetadataFile', () => {
    const metadataFile = {
      name: "hei.txt",
      size: 20000
    }

    expect(isNativeFile(metadataFile)).toBe(false)
  })
})