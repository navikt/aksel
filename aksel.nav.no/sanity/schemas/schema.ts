import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import editors from "./documents/migrated/editors";
import frontpage from "./documents/migrated/frontpage";
import redirect from "./documents/migrated/redirects";

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

    Designsystem.Color,
    Designsystem.ColorCategories,
    Designsystem.TokensOld,
    Designsystem.TokenKategori,
    Designsystem.KodeEksempler,
    Designsystem.Props,
    Designsystem.ComponentTemplate,
    Designsystem.Frontpage,
    Designsystem.KomponentArtikkel,
    Designsystem.Artikkel,
    Designsystem.Navigation,
    Designsystem.ds_header_heading,

    Aksel.Artikkel,
    Aksel.Blogg,
    Aksel.Tema,
    Aksel.Prinsipp,
    Aksel.Standalone,
  ]),
});
