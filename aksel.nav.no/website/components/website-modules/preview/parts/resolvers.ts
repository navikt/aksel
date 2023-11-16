import { ResolverT } from "./types";

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
    if (resolver.key.includes(".")) {
      const value = getNestedValue(acc, resolver.key);
      if (value !== undefined) {
        setNestedValue(acc, resolver.key, resolver.cb(value));
      }
    } else if (resolver.key in acc) {
      acc[resolver.key] = resolver.cb(acc[resolver.key]);
    }
    return acc;
  }, data);
}

function setNestedValue(obj: any, path: string, value: any) {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

function getNestedValue(obj: any, path: string) {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (current[key] === undefined) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}
