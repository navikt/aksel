import {
  BadRequestErrorResponseWithErrMessage,
  ErrorResponsePayloadWithErrMessage,
  GetFileComponentsResponse,
  GetImagesResponse,
  PublishedComponent,
} from "@figma/rest-api-spec";

/* https://www.figma.com/developers/api#library-items */
const FIGMA_FILE_KEY = "wEdyFjCQSBR3U7FvrMbPXa";

export const fetchIcons = async (): Promise<PublishedComponent[]> => {
  console.info("Fetching list of published icons from Figma...");
  const data:
    | GetFileComponentsResponse
    | BadRequestErrorResponseWithErrMessage = await fetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/components`,
    {
      headers: {
        "Content-type": "application/json",
        "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN ?? "",
      },
    },
  )
    .then((x) => x.json())
    .catch((e) => {
      throw e.message;
    });

  if (data.status !== 200) {
    throw new Error(data.err);
  }

  if (data.meta.components.length === 0) {
    throw new Error("No published icons found");
  }

  return data.meta.components;
};

export const fetchDownloadUrls = async (
  nodeIds: string[],
): Promise<Record<string, string>> => {
  /* Would just using Record be better here? Yes. But is a self-referencing return kinda cool? Also yes */
  const idUrlPairs: Awaited<ReturnType<typeof fetchDownloadUrls>> = {};

  /* Figma accepts a comma-separated list of ids: GET /v1/images/:key?ids=1:2,1:3,1:4 */
  const paginatedNodeIds = splitIntoParts(nodeIds, 5);

  for (const ids of paginatedNodeIds) {
    const data: GetImagesResponse | ErrorResponsePayloadWithErrMessage =
      await fetch(
        `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}/?ids=${ids}&format=svg`,
        {
          headers: {
            "Content-type": "application/json",
            "X-FIGMA-TOKEN": process.env.FIGMA_TOKEN ?? "",
          },
        },
      )
        .then((x) => x.json())
        .catch((e) => {
          throw e.message;
        });

    if (data.err !== null) {
      throw new Error(data.err);
    }

    for (const [key, value] of Object.entries(data.images)) {
      if (!value) {
        continue;
      }
      idUrlPairs[key] = value;
    }
  }
  return idUrlPairs;
};

/**
 * Splits an array of strings into parts where each part is a comma-separated string of all the strings for that part.
 * @returns An array of comma-separated strings.
 */
export function splitIntoParts(arr: string[], pages: number): string[] {
  const partSize = Math.ceil(arr.length / pages);
  const parts: string[] = [];

  for (let i = 0; i < pages && i * partSize < arr.length; i++) {
    const part = arr.slice(i * partSize, (i + 1) * partSize);
    parts.push(part.join(","));
  }

  return parts;
}
