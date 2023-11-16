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
    const dataFromKeys = resolver.dataKeys.map((key) =>
      getNestedProperty(acc, key)
    );
    acc[resolver.key] = resolver.cb(dataFromKeys);
    return acc;
  }, structuredClone(data));
}

function getNestedProperty(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}
