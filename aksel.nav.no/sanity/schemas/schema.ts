import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import editors from "./documents/migrated/editors";
import frontpage from "./documents/migrated/frontpage";
import redirect from "./documents/migrated/redirects";
import KodeEksempler from "./documents/migrated/kode-eksempler";
import Tokens from "./documents/migrated/tokens";
import Props from "./documents/migrated/props";
import DsFrontpage from "./documents/migrated/ds-frontpage";
import DsCompTemplate from "./documents/migrated/component-template";
import Navigation, { ds_header_heading } from "./documents/migrated/navigation";

import * as Designsystem from "./documents/designsystem";
import * as Aksel from "./documents/aksel";
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

    KodeEksempler,
    Tokens,
    Props,
    DsFrontpage,
    DsCompTemplate,
    Designsystem.KomponentArtikkel,
    Designsystem.Artikkel,

    Aksel.Artikkel,
    Aksel.Blogg,
    Aksel.Tema,
    Aksel.Prinsipp,
    Aksel.Standalone,
  ]),
});
