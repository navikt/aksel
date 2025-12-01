export type NextPageT<T> = {
  props: T & {
    slug?: string;
    preview: boolean;
    id: string;
    /**
     * @deprecated Should be removed since it's not used anymore.
     */
    title: string;
  };
  notFound: boolean;
  revalidate?: number;
};
