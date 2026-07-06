import { defineField, defineType } from "sanity";
import { BodyLong, ReadMore, VStack } from "@navikt/ds-react";
import { komponentKategorier } from "../../../config";
import { showForDevsOnly } from "../../../util";
import { EndringsloggReferanser } from "../../custom-components/gp/EndringsloggReferanser";
import { artikkelPreview } from "../presets/artikkel-preview";
import SanityTabGroups from "../presets/groups";
import { hiddenFields } from "../presets/hidden-fields";
import { oppdateringsvarsel } from "../presets/oppdateringsvarsel";
import BaseSEOPreset from "../presets/seo";
import { kategoriSlug } from "../presets/slug";
import { titleField } from "../presets/title-field";

const prefix = "komponenter/";

export const KomponentArtikkel = defineType({
  title: "Komponentartikkel",
  name: "komponent_artikkel",
  type: "document",
  groups: SanityTabGroups,
  ...artikkelPreview("Komponenter", 6),
  renderMembers: (members) => {
    return [
      ...members,
      {
        key: "endringslogg",
        kind: "decoration",
        component: () => <EndringsloggReferanser source="ds" />,
      },
    ];
  },
  fields: [
    oppdateringsvarsel,
    ...hiddenFields,
    titleField,

    defineField({
      title: "Kategori",
      name: "kategori",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          ...komponentKategorier.map((x) => ({
            title: x.title,
            value: x.value,
          })),
          { title: "Frittstående", value: "standalone" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      title: "Sidebar index",
      description:
        "Overstyrer sortering av artikler i sidebar. Hvis feltet er tomt, sorteres den alfabetisk.",
      name: "sidebarindex",
      type: "number",
      group: "settings",
    }),
    kategoriSlug(prefix),
    defineField({
      title: "Forvalter",
      name: "contact",
      type: "reference",
      to: [{ type: "editorial_staff" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: "Metadata",
      name: "status",
      group: "innhold",
      type: "object",
      fields: [
        defineField({
          title: "Status",
          name: "tag",
          type: "string",
          initialValue: "new",
          options: {
            list: [
              { title: "Beta", value: "beta" },
              { title: "Preview", value: "preview" },
              { title: "New", value: "new" },
              { title: "Stable", value: "ready" },
              { title: "Legacy", value: "deprecated" },
            ],
            layout: "radio",
          },
          components: {
            field: (props) => (
              <VStack gap="space-4">
                {props.renderDefault(props)}
                {props.value === "preview" && (
                  <ReadMore size="small" header="Hva 'Preview' innebærer">
                    <BodyLong spacing>
                      Preview betyr at vi ikke er 100% sikre på at komponenten
                      er riktig utformet. Statusen kan brukes på både ferdige
                      komponenter som vi bare vil gi en &quot;soft launch&quot;,
                      og på uferdige/eksperimentelle komponenter som er under
                      aktiv utvikling.
                    </BodyLong>

                    <BodyLong spacing>
                      Preview-komponenter skal bare kunne importeres fra{" "}
                      <code>@navikt/ds-react/PREVIEW</code>.
                    </BodyLong>

                    <BodyLong>
                      Komponenten skal ut av Preview når vi har blitt trygge på
                      at den er riktig utformet, og det ikke er planlagt
                      større/brekkende endringer i nærmeste fremtid. Husk å
                      gjøre en vurdering av dette minst én gang i tertialet.
                    </BodyLong>
                  </ReadMore>
                )}
              </VStack>
            ),
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "unsafe",
          title: "Unsafe",
          description: "Er komponenten Beta + UNSAFE-prefikset?",
          type: "boolean",
          hidden: ({ parent }) => !(parent?.tag === "beta"),
        }),
        defineField({
          name: "preview_note",
          title: "Preview-notat",
          type: "riktekst_accordion",
          description: `Skal gi et tydelig signal om hvor stabil komponenten er.
            Bør inneholde kjente feil/mangler og hva vi er usikre på.
            Hvis vi vil åpne for brekkende endringer utenom major, må dette også
            nevnes her, samt i JSDoc.`,
          hidden: ({ parent }) => !(parent?.tag === "preview"),
        }),
        defineField({
          name: "internal",
          title: "Interne flater",
          description: "Er komponenten ment for bruk på interne flater?",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "bilde",
          title: "Thumbnail",
          type: "image",
        }),
      ],
    }),

    defineField({
      title: "Ikke vis 'Send innspill'-modul på siden",
      name: "hide_feedback",
      type: "boolean",
      initialValue: false,
      group: "settings",
      hidden: showForDevsOnly(),
    }),
    defineField({
      name: "intro",
      type: "intro_komponent",
      group: "innhold",
    }),
    defineField({
      title: "Innhold",
      description:
        "Innholdet i artikkelen er riktekst. Tips: klikk på ikon i høyre hjørne for å skrive i fullskjerm.",
      name: "content",
      group: "innhold",
      type: "riktekst_komponent",
    }),
    defineField({
      title: "Kodepakker",
      name: "kodepakker",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "ds-react", value: "ds-react" },
          { title: "ds-css", value: "ds-css" },
          { title: "ds-tokens", value: "ds-tokens" },
          { title: "ds-tailwind", value: "ds-tailwind" },
        ],
      },
    }),
    defineField({
      title: "Figma-lenke (valgfritt)",
      name: "figma_link",
      type: "url",
      group: "lenker",
    }),
    BaseSEOPreset,
  ],
  orderings: [
    {
      title: "Sist godkjent",
      name: "lastVerified",
      by: [{ field: "updateInfo.lastVerified", direction: "asc" }],
    },
  ],
});
