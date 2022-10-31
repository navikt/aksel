export const getUnpublished = (docs: Record<string, any>[]) =>
  docs.filter(
    (doc, i, arr) =>
      doc._id.startsWith("drafts.") &&
      !arr.find((x, y) => i !== y && doc._id.includes(x._id))
  );

export const getDrafts = (docs: Record<string, any>[]) =>
  docs.filter((doc, i, arr) =>
    arr.find((x, y) => i !== y && x._id.includes(doc._id))
  );

export const getPublished = (docs: Record<string, any>[]) =>
  docs
    .filter(
      (doc, i, arr) => !arr.find((x, y) => i !== y && x._id.includes(doc._id))
    )
    .filter((doc) => !doc._id.includes("drafts"));
