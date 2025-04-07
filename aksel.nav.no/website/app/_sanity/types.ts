import { PortableTextComponentProps } from "next-sanity";
import {
  BLOGG_BY_SLUG_QUERYResult,
  GRUNNLEGGENDE_BY_SLUG_QUERYResult,
  KOMPONENT_BY_SLUG_QUERYResult,
  MONSTER_MALER_BY_SLUG_QUERYResult,
} from "./query-types";

type QueryResults =
  | KOMPONENT_BY_SLUG_QUERYResult
  | GRUNNLEGGENDE_BY_SLUG_QUERYResult
  | MONSTER_MALER_BY_SLUG_QUERYResult
  | BLOGG_BY_SLUG_QUERYResult;

type PortableContentTypes = Exclude<
  | NonNullable<NonNullable<QueryResults>["content"]>[number]["_type"]
  | "token_kategori",
  "block" | "reference"
>;

// Generic utility type to extract a specific type from the content array
type ExtractPortableType<T extends PortableContentTypes> = Extract<
  NonNullable<NonNullable<QueryResults>["content"]>[number],
  { _type: T }
>;

type ExtractPortableComponentProps<T extends PortableContentTypes> =
  PortableTextComponentProps<ExtractPortableType<T>>;

export type { ExtractPortableComponentProps, PortableContentTypes };
