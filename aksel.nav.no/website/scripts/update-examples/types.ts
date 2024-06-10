export type FileArrayT = {
  _key: string;
  innhold: string;
  title: string;
  navn: string;
  index: number;
  description?: string;
  sandboxEnabled?: boolean;
  sandboxBase64: string;
}[];

export type DirectoryDataT = { path: string }[];

export type ArgsT = {
  title?: string;
  index?: number;
  desc?: string;
  sandbox?: boolean;
};

export const rootDirectories = ["eksempler", "templates"] as const;
export type RootDirectoriesT = (typeof rootDirectories)[number];
