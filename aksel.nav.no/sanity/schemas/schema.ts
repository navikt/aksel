import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

/* Schemas */
/* Documents */
import editors from "./documents/editors";
import navigation, { dropdown, link } from "./documents/navigation";
import frontpage from "./documents/frontpage";
import redirect from "./documents/redirects";

import * as Designsystem from "./documents/designsystem";
import * as Aksel from "./documents/aksel";
import v2Blocks from "./modules";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    ...v2Blocks,
    frontpage,
    editors,
    navigation,
    link,
    dropdown,
    redirect,

    Designsystem.Color,
    Designsystem.ds_header_heading,
    Designsystem.ColorCategories,
    Designsystem.Tokens,
    Designsystem.KodeEksempler,
    Designsystem.Props,
    Designsystem.ComponentTemplate,
    Designsystem.Frontpage,
    Designsystem.Navigation,
    Designsystem.KomponentArtikkel,
    Designsystem.Artikkel,

    Aksel.Artikkel,
    Aksel.Blogg,
    Aksel.Tema,
    Aksel.Prinsipp,
    Aksel.Standalone,
  ]),
});
