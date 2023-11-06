export type FileArrayT = {
  innhold: string;
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
export type RootDirectoriesT = "eksempler" | "templates";
