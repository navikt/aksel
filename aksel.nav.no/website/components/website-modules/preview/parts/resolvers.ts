import { ResolverT } from "./types";

/**
 * `runResolvers` is responsible for executing a set of resolvers for streamed data from sanity.
 * This allows running functions and parse data both at initial load `getStaticProps` and when streamed `useLiveQuery`
 * @param {Array<Resolvers>}
 * @returns any
 */
export function runResolvers({
  resolvers,
  data,
}: {
  resolvers: ResolverT;
  data: any;
}) {
  if (!resolvers) {
    return data;
  }

  return resolvers.reduce((acc, resolver) => {
    /* Not allowed to edit accumulators directly as its readonly*/
    const _acc = { ...acc };
    const dataFromKeys = resolver.dataKeys.map((key) =>
      getNestedProperty(_acc, key)
    );

    /**
     * In some cases the data can be undefined. This filters this out and avoids overriding it
     */
    if (dataFromKeys.filter((x) => !!x).length > 0) {
      _acc[resolver.key] = resolver.cb(dataFromKeys);
    }

    return _acc;
  }, data);
}

function getNestedProperty(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}
