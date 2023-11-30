export type FileArrayT = {
  innhold: string;
  title: string;
  navn: string;
  index: number;
  description?: string;
  sandboxEnabled?: boolean;
  sandboxBase64: string;
  compact: boolean;
}[];

export type DirectoryDataT = { path: string }[];

export type ArgsT = {
  title?: string;
  index?: number;
  desc?: string;
  sandbox?: boolean;
  compact?: boolean;
};
export type RootDirectoriesT = "eksempler" | "templates";
