function generateRoundedTwTags(name: string) {
  const options = [
    "s",
    "e",
    "t",
    "r",
    "b",
    "l",
    "ss",
    "se",
    "ee",
    "es",
    "tl",
    "tr",
    "br",
    "bl",
  ];

  return `rounded-${name},${options
    .map((option) => `rounded-${option}-${name}`)
    .join(",")}`;
}

function generateBgTwTags(name: string, addNewPrefix = false) {
  const options = [
    "bg",
    "to",
    "via",
    "from",
    "fill",
    "text",
    "caret",
    "ring",
    "divide",
    "border",
    "stroke",
    "accent",
    "shadow",
    "outline",
    "border-x",
    "border-y",
    "border-s",
    "border-e",
    "border-t",
    "border-r",
    "border-b",
    "border-l",
    "decoration",
    "placeholder",
    "ring-offset",
  ];

  return `${options
    .map((option) => `${option}-${addNewPrefix ? "ax-" : ""}${name}`)
    .join(",")}`;
}

export { generateRoundedTwTags, generateBgTwTags };
