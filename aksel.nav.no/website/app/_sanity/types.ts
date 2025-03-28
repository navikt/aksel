import { PortableTextComponentProps } from "next-sanity";
import {
  BLOGG_BY_SLUG_QUERYResult,
  GRUNNLEGGENDE_BY_SLUG_QUERYResult,
  KOMPONENT_BY_SLUG_QUERYResult,
} from "./query-types";

/* TODO: Currently only handles "komponenter". Extend to cover all doctypes */
type PortableContentTypes = NonNullable<
  NonNullable<
    | KOMPONENT_BY_SLUG_QUERYResult
    | GRUNNLEGGENDE_BY_SLUG_QUERYResult
    | BLOGG_BY_SLUG_QUERYResult
  >["content"]
>[number]["_type"];

// Generic utility type to extract a specific type from the content array
type ExtractPortableType<T extends PortableContentTypes> = Extract<
  NonNullable<
    NonNullable<
      | KOMPONENT_BY_SLUG_QUERYResult
      | GRUNNLEGGENDE_BY_SLUG_QUERYResult
      | BLOGG_BY_SLUG_QUERYResult
    >["content"]
  >[number],
  { _type: T }
>;

type ExtractPortableComponentProps<T extends PortableContentTypes> =
  PortableTextComponentProps<ExtractPortableType<T>>;

export type { ExtractPortableComponentProps, PortableContentTypes };
