import { type ExtractPortableMarkdownComponentProps } from "@/app/_sanity/types";
import { buildMarkdown } from "@/app/api/markdown/helpers/build-markdown";

/**
 * TODO:
 * - Add different code-views based on "expanded"-state for codesnippet. See Github Primer DS for example
 * - - Do parsing serverside, to avoid exposing large npm packages in the client bundle
 */
function KodeEksemplerMarkdown(
  data: ExtractPortableMarkdownComponentProps<"kode_eksempler">,
) {
  const { dir } = data.value;

  if (!dir?.filer || dir.filer.length === 0) {
    return "";
  }

  const markdownExamples: string[] = [];

  for (const fil of dir.filer) {
    fil.title && markdownExamples.push(`### ${fil.title}`);
    fil.description && markdownExamples.push(`${fil.description}`);
    fil.innhold && markdownExamples.push(`\`\`\`tsx\n${fil.innhold}\n\`\`\``);
  }

  return buildMarkdown(...markdownExamples);
}

export { KodeEksemplerMarkdown };
