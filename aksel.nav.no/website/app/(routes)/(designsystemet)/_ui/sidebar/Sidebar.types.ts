type SidebarInputNodeT = {
  _type: string;
  heading: string;
  slug: string;
  kategori: string;
  tag: "beta" | "new" | "ready" | "deprecated" | "preview";
  sidebarindex: number | null;
};

export type SidebarPageT = Pick<SidebarInputNodeT, "heading" | "slug" | "tag">;

export type SidebarGroupedPagesT = {
  title: string;
  value: string;
  pages: SidebarPageT[];
};

export type DesignsystemSidebarSectionT = (
  | SidebarPageT
  | SidebarGroupedPagesT
)[];
