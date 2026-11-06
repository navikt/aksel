/* eslint-disable typescript/no-empty-object-type */
export type PageProps<T extends object = {}> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};
