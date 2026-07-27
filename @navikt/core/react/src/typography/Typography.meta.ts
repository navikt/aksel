import type { ComponentMetadata } from "../utils/types/metadata";
import {
  BodyLong,
  BodyShort,
  Detail,
  ErrorMessage,
  Heading,
  Ingress,
  Label,
} from "./index";

const metadata: ComponentMetadata = {
  name: "Typography",
  components: {
    Heading,
    Ingress,
    BodyLong,
    BodyShort,
    Label,
    Detail,
    ErrorMessage,
  },
  keywords: ["typography", "typografi", "text", "tekst", "heading"],
};

export { metadata };
