export type FileT = {
  innhold: string;
  navn: string;
  description: string | null;
  index: number;
}[];

export type DirectoryDataT = { path: string }[];
