/* eslint-disable @typescript-eslint/no-empty-object-type */
// biome-ignore lint/complexity/noBannedTypes: This is the closest we get to the correct default type (empty object)
export type PageProps<T extends object = {}> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
