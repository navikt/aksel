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
};
