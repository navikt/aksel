import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import editors from "./documents/editors";
import frontpage from "./documents/frontpage";
import redirect from "./documents/redirects";
import KodeEksempler from "./documents/kode-eksempler";
import Tokens from "./documents/tokens";
import Props from "./documents/props";
import DsFrontpage from "./documents/ds-frontpage";
import DsCompTemplate from "./documents/component-template";
import KompArtikkel from "./documents/komponent";
import AkselTema from "./documents/tema";
import AkselArtikkel from "./documents/aksel-artikkel";
import DsArtikkel from "./documents/ds-artikkel";
import Blogg from "./documents/blogg";
import Prinsipp from "./documents/prinsipp";
import Standalone from "./documents/standalone";
import Navigation, { ds_header_heading } from "./documents/navigation";

import v2Blocks from "./modules";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    ...v2Blocks,
    frontpage,
    editors,
    redirect,
    Navigation,
    ds_header_heading,
    KompArtikkel,

    KodeEksempler,
    Tokens,
    Props,
    DsFrontpage,
    DsCompTemplate,
    DsArtikkel,

    AkselArtikkel,
    Blogg,
    AkselTema,
    Prinsipp,
    Standalone,
  ]),
});
