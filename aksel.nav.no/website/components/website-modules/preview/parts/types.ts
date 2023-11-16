import { ComponentType } from "react";

export type ResolverT = { key: string; cb: (v: any) => any }[];

export type PreviewProps = {
  /**
   * Component to call with live data.
   * This would normally be the page-component
   */
  comp: ComponentType;
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
   * @example Supports nested objects like `page.content`
   * @example
   * Here we run `generateSidebar` function on `sidebar` key every time the data is reloaded
   * resolvers={[
   *   { key: "sidebar", cb: (v) => generateSidebar(v, "komponenter") },
   * ]}
   */
  resolvers?: ResolverT;
};
