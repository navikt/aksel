import type { PortableTextRendererOptions } from "@portabletext/markdown";
import { PortableTextComponentProps } from "next-sanity";
import {
  BLOGG_BY_SLUG_QUERY_RESULT,
  GRUNNLEGGENDE_BY_SLUG_QUERY_RESULT,
  KOMPONENT_BY_SLUG_QUERY_RESULT,
  MONSTER_MALER_BY_SLUG_QUERY_RESULT,
} from "./query-types";

type QUERY_RESULTs =
  | KOMPONENT_BY_SLUG_QUERY_RESULT
  | GRUNNLEGGENDE_BY_SLUG_QUERY_RESULT
  | MONSTER_MALER_BY_SLUG_QUERY_RESULT
  | BLOGG_BY_SLUG_QUERY_RESULT;

type PortableContentTypes = Exclude<
  | NonNullable<NonNullable<QUERY_RESULTs>["content"]>[number]["_type"]
  | "token_kategori",
  "block" | "reference"
>;

// Generic utility type to extract a specific type from the content array
type ExtractPortableType<T extends PortableContentTypes> = Extract<
  NonNullable<NonNullable<QUERY_RESULTs>["content"]>[number],
  { _type: T }
>;

type ExtractPortableComponentProps<T extends PortableContentTypes> =
  PortableTextComponentProps<ExtractPortableType<T>>;

type ExtractPortableMarkdownComponentProps<T extends PortableContentTypes> =
  PortableTextRendererOptions<ExtractPortableType<T>>;

export type {
  ExtractPortableComponentProps,
  ExtractPortableMarkdownComponentProps,
  PortableContentTypes,
};
