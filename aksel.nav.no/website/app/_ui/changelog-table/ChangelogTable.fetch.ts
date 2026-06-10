import { sanityFetch } from "@/app/_sanity/live";
import {
  DS_CHANGELOGS_FOR_ID_QUERY,
  GP_CHANGELOGS_FOR_ID_QUERY,
} from "@/app/_sanity/queries";

type Defined<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

async function fetchChangelogs(id: string, type: "gp" | "ds") {
  const { data } = await sanityFetch({
    query:
      type === "ds" ? DS_CHANGELOGS_FOR_ID_QUERY : GP_CHANGELOGS_FOR_ID_QUERY,
    params: { id },
  });

  const validChangelogs: NonNullable<Defined<typeof data>> = [];

  for (const changelog of data) {
    if (
      !changelog.endringsdato ||
      !changelog.heading ||
      !changelog.slug?.current
    ) {
      continue;
    }
    validChangelogs.push(changelog);
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
