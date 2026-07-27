import type * as docgen from "react-docgen-typescript";

/** A `react-docgen-typescript` component doc enriched with parsed JSDoc tags. */
interface ComponentDoc extends docgen.ComponentDoc {
  props: {
    [key: string]: docgen.PropItem & {
      example?: string;
      params?: string[];
      return?: string;
      deprecated?: string;
    };
  };
}

/** A single documented component/util as emitted to `_metadata.json`. */
interface DocumentedEntry {
  displayName: string;
  filePath: string;
  overridable: boolean;
  props: ComponentDoc["props"];
}

type MetadataEntry = {
  name: string;
  dir: string;
  keywords: string[];
  related: string[];
  components: DocumentedEntry[];
  utils: DocumentedEntry[];
};

type Metadata = MetadataEntry[];

export type { MetadataEntry, Metadata, ComponentDoc, DocumentedEntry };
