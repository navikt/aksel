function getLineNumberFromIndexSplit(fileContent: string, index: number) {
  const lines = fileContent.split("\n");
  let lineNumber = 1;
  let charCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1; // +1 to account for the newline character that was removed by split

    if (charCount + lineLength > index) {
      return lineNumber;
    }

    charCount += lineLength;
    lineNumber++;
  }

  return lineNumber; // Should not reach here if the index is within the file content range
}

export { getLineNumberFromIndexSplit };
