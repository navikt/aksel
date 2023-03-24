export type NextPageT<T> = {
  props: T & {
    slug: string;
    preview: boolean;
    id: string;
    title: string;
  };
  notFound: boolean;
};
