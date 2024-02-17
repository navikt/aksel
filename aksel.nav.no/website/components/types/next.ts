export type NextPageT<T> = {
  props: T & {
    slug?: string;
    id: string;
    title: string;
    draftMode?: boolean;
    token?: string;
  };
  notFound: boolean;
  revalidate?: number;
};
