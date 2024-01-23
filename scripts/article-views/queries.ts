export const queryArticleURLs = `
*[_type == "aksel_artikkel"] {
  _id,
  "slug": slug.current
}
`;

export const queryArticleViews = `
*[_type == "article_views"] {
  _id,
}
`;
