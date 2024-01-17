type TableOfContentsEntryT = {
  title: string;
  id: string;
};

export type TableOfContentsT = (TableOfContentsEntryT & {
  children: TableOfContentsEntryT[];
})[];
