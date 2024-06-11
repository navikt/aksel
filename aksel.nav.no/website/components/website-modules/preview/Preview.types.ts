import type { QueryParams } from "next-sanity";

export type PreviewProps = {
  children: (props: PreviewProps["props"], loading: boolean) => React.ReactNode;
  /**
   * Sanity(groq)-query to run live data on
   */
  query: string;
  /**
   * sanity(groq)-params
   */
  params?: QueryParams;
  /**
   * Default/fallback-data if preview fails and for initial load
   */
  props: any;
};
