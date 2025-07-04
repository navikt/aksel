/**
 * Capitalize the first letter of a string.
 */
function capitalizeText(inputString: string): string {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

/**
 * Abbreviate a name while keeping the first and last names intact.
 */
function abbrName(name: string): string {
  return name
    .split(" ")
    .filter((val) => val.trim() !== "") // Remove any empty strings caused by extra spaces
    .map((val, index, arr) =>
      index !== 0 && index !== arr.length - 1 ? val.charAt(0) + "." : val,
    )
    .join(" ");
}

export { abbrName, capitalizeText };
