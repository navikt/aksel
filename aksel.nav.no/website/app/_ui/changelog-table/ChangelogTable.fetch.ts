import { sanityFetch } from "@/app/_sanity/live";
import {
  DS_CHANGELOGS_FOR_ID_QUERY,
  GP_CHANGELOGS_FOR_ID_QUERY,
} from "@/app/_sanity/queries";

async function fetchChangelogs(id: string, type: "gp" | "ds") {
  const { data } = await sanityFetch({
    query:
      type === "ds" ? DS_CHANGELOGS_FOR_ID_QUERY : GP_CHANGELOGS_FOR_ID_QUERY,
    params: { id: id.replace("drafts.", "") },
  });

  const validChangelogs: {
    endringsdato: string;
    heading: string;
    slug: { current: string };
  }[] = [];

  for (const changelog of data) {
    if (
      !changelog.endringsdato ||
      !changelog.heading ||
      !changelog.slug?.current
    ) {
      continue;
    }

    validChangelogs.push({
      endringsdato: changelog.endringsdato,
      heading: changelog.heading,
      slug: {
        current: changelog.slug.current,
      },
    });
  }

  if (validChangelogs.length === 0) {
    return {
      exists: false,
    } as const;
  }

  return {
    exists: true,
    list: validChangelogs,
  } as const;
}

type FetchChangelogsResult = Awaited<ReturnType<typeof fetchChangelogs>>;

export { fetchChangelogs };
export type { FetchChangelogsResult };
