export function isAcceptedFileType(
  file: File,
  accept: string | undefined,
): boolean {
  if (!accept) {
    return true;
  }
  const mimeType = file.type;
  const acceptedTypes = accept.split(",");

  return acceptedTypes.some((type) => {
    const validType = type.trim();
    const isExtensionType = validType.startsWith(".");
    const isWildcardMimeType = validType.endsWith("/*");

    if (isExtensionType) {
      return file.name.toLowerCase().endsWith(validType.toLowerCase());
    }

    if (isWildcardMimeType) {
      const baseMimeType = mimeType.replace(/\/.*$/, "");
      const baseValidType = validType.replace(/\/.*$/, "");
      return baseMimeType === baseValidType;
    }

    return mimeType === validType;
  });
}
