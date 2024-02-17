export type ResolverT = {
  key: string;
  dataKeys: string[];
  cb: (v: any[]) => any;
}[];

export type PreviewProps = {
  children: (props: PreviewProps["props"], loading: boolean) => React.ReactNode;
  /**
   * Sanity(groq)-query to run live data on
   */
  query: string;
  /**
   * sanity(groq)-params
   */
  params?: any;
  /**
   * Default/fallback-data if preview fails and for initial load
   */
  props: any;
  /**
   * Array of functions we want to run on live data when fetched
   * @example Supports getting data from nested objects like `page.content`
   * @example
   * Here we run `generateSidebar` function on `sidebar` key every time the data is reloaded
   * resolvers={[
   *   { key: "sidebar", dataKeys: ["page.content", "page.intro"], cb: (v) => generateSidebar(v[0], "komponenter") },
   * ]}
   */
  resolvers?: ResolverT;
};
