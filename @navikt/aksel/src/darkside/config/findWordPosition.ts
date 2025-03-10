function getWordPositionInFile(
  fileContent: string,
  index: number,
): { row: number; column: number } {
  const lines = fileContent.split("\n");
  let lineNumber = 1;
  let charCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1; // +1 to account for the newline character that was removed by split

    if (charCount + lineLength > index) {
      return { row: lineNumber, column: index - charCount + 1 };
    }

    charCount += lineLength;
    lineNumber++;
  }

  return { row: lineNumber, column: 0 }; // Should not reach here if the index is within the file content range
}

export { getWordPositionInFile };
