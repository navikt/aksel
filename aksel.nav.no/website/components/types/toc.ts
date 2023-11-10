export type TableOfContentsT = {
  title: string;
  id: string;
  children: Omit<TableOfContentsT, "children">;
}[];
