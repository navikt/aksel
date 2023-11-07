export type FileArrayT = {
  innhold: string;
  title: string;
  navn: string;
  index: number;
  description?: string;
}[];

export type DirectoryDataT = { path: string }[];

export type ArgsT = {
  title?: string;
  index?: number;
  desc?: string;
};
export type RootDirectoriesT = "eksempler" | "templates";
