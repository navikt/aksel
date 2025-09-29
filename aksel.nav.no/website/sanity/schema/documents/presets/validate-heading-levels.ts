const validateHeadingLevels = (blocks: unknown) => {
  if (!blocks || !Array.isArray(blocks)) {
    return true;
  }

  const headings = blocks
    .filter(
      (block) =>
        block._type === "block" && ["h2", "h3", "h4"].includes(block.style),
    )
    .map((block) => ({
      level: parseInt(block.style.replace("h", ""), 10),
      text: String(block.children[0]?.text || ""),
    }));

  if (headings.length === 0) {
    return true;
  }

  if (headings[0].level !== 2) {
    return `Overskriftene på øverste nivå skal være på nivå 2. Fant "${headings[0].text}" på nivå ${headings[0].level}.`;
  }

  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level > headings[i - 1].level + 1) {
      return `Overskriftene må ikke hoppe over nivåer. Fant "${
        headings[i].text
      }" på nivå ${headings[i].level} etter en overskrift på nivå ${
        headings[i - 1].level
      }.`;
    }
  }
  return true;
};

export { validateHeadingLevels };
