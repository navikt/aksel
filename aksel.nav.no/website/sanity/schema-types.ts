export type ResolveSlugT<T> = Omit<T, "slug"> & {
  slug: string;
};

type DocumentT<T> = {
  _createdAt: Date;
  _updatedAt: Date;
  _id: string;
  _rev?: string;
  _type: T;
};

export interface AkselStandaloneDocT extends DocumentT<"aksel_standalone"> {
  publishedAt?: Date;
  heading: string;
  slug: {
    current: string;
  };
  content: any[];
}
