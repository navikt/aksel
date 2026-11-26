import { format } from "date-fns/format";
import { getISOWeek } from "date-fns/getISOWeek";
import { isSameISOWeek } from "date-fns/isSameISOWeek";
import { resolveUrl } from "../resolve-production-url";
import type {
  NewsletterArticleT,
  NewsletterChangelogT,
  NewsletterEntriesT,
} from "./newsletter-query";

// sequence matters
const ARTICLE_SECTIONS: { title: string; types: string[] }[] = [
  { title: "God praksis", types: ["aksel_artikkel"] },
  { title: "Produktbloggen", types: ["aksel_blogg"] },
  { title: "Designsystemkomponenter", types: ["komponent_artikkel"] },
  { title: "Grunnleggende i designsystemet", types: ["ds_artikkel"] },
  { title: "Mønster og maler", types: ["templates_artikkel"] },
  { title: "Prinsipper", types: ["aksel_prinsipp"] },
  { title: "Annet", types: ["aksel_standalone"] },
];

const formatLine = (entry: NewsletterArticleT) => {
  const title = entry.heading?.trim() || "";
  const url = resolveUrl(entry, "https://aksel.nav.no");
  return url ? `• [${title}](${url})` : `• ${title}`;
};

const formatSection = (title: string, lines: string[]) =>
  lines.length > 0 ? [`*${title}*`, ...lines].join("\n") : null;

/**
 * Formats the entries as editable text, with `*bold*` headings and `[title](url)` links.
 * We use `toSlackHtml` when copying, so the links become clickable when pasted into Slack.
 */
export const formatSlackMessage = (
  { articles, changelog }: NewsletterEntriesT,
  { from, to }: { from: Date; to: Date },
) => {
  const articleSections = ARTICLE_SECTIONS.map(({ title, types }) =>
    formatSection(
      title,
      articles
        .filter((article) => types.includes(article._type))
        .map(formatLine),
    ),
  ).filter((section): section is string => section !== null);

  const changelogLines = (
    typeOfChange: (entry: NewsletterChangelogT) => boolean,
  ) => changelog.filter(typeOfChange).map(formatLine);

  // sequence matters
  const changelogSections = [
    formatSection(
      "Design",
      changelogLines((entry) => entry.endringstype === "design"),
    ),
    formatSection(
      "Endringer i dokumentasjonen",
      changelogLines(
        (entry) =>
          entry._type === "gp_endringslogg_artikkel" ||
          entry.endringstype === "dokumentasjon",
      ),
    ),
    formatSection(
      "Kode",
      changelogLines((entry) => entry.endringstype === "kode"),
    ),
  ].filter((section): section is string => section !== null);

  const sections = [
    ...articleSections,
    ...(changelogSections.length > 0
      ? ["*📝 Endringslogg*", ...changelogSections] // heading for the changelog section
      : []),
  ];

  const period = isSameISOWeek(from, to)
    ? `uke ${getISOWeek(from)}` // uketall
    : `${format(from, "dd.MM.yyyy")}–${format(to, "dd.MM.yyyy")}`;

  if (sections.length === 0) {
    return `:newspaper: *Nytt fra Aksel (${period})*\n\nIngen nye publiseringer denne perioden.`;
  }

  return [`:newspaper: *Nytt fra Aksel (${period})*`, ...sections].join("\n\n");
};

/**
 * [title](https://url). Title can't contain "]" or line breaks, url can't contain ")" or spaces.
 * Groups: $1 = title, $2 = url.
 */
const MARKDOWN_LINK = /\[([^\]\n]+)\]\((https?:\/\/[^)\s]+)\)/g;

/**
 * Converts the text from `formatSlackMessage` to HTML.
 * Slack's message composer keeps links and bold text from pasted HTML, but not from pasted markdown.
 */
export const toSlackHtml = (text: string) =>
  text
    /* Escape first, so the HTML tags added below are the only markup */
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replace(MARKDOWN_LINK, '<a href="$2">$1</a>')
    /* *text* -> bold, within a single line */
    .replace(/\*([^*\n]+)\*/g, "<b>$1</b>")
    .replaceAll("\n", "<br>");

/**
 * Converts the text from `formatSlackMessage` to Slack mrkdwn, used when posting through the Slack API.
 * `*bold*` is already valid mrkdwn, so only links and the characters Slack requires escaped are changed.
 */
export const toSlackMrkdwn = (text: string) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replace(MARKDOWN_LINK, "<$2|$1>");
