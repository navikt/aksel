type TableOfContentsEntryT = {
  title: string;
  id: string;
};

export type TableOfContentsT = Array<
  TableOfContentsEntryT & {
    children: TableOfContentsEntryT[];
  }
>;
