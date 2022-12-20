/// <reference types="@sanity-codegen/types" />

declare namespace SanityT {
  namespace Schema {
    /**
     * Redaktører
     */
    interface editor extends Sanity.Document {
      _type: "editor";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * Sanity bruker-id - `Slug`
       */
      user_id?: {
        _type: "user_id";
        current: string;
      };

      /**
       * Gjør meg anonym - `Boolean`
På artikler bytter vi ut navnet ditt med et tullenavn. Eks. Sprudlende Tiger
       */
      anonym?: boolean;

      /**
       * Anonymt navn - `Slug`
       */
      anon_navn?: {
        _type: "anon_navn";
        current: string;
      };

      /**
       * Roller - `Array`
eks: Utvikler, Webanalytiker, uu-spesialist
       */
      roller?: Array<Sanity.Keyed<string>>;

      /**
       * Profil - `String`
       */
      profile_page?: string;
    }

    /**
     * Redirect
     */
    interface redirect extends Sanity.Document {
      _type: "redirect";

      /**
       * Fra - `String`
       */
      source?: string;

      /**
       * Til - `String`
       */
      destination?: string;

      /**
       * Permanent - `Boolean`
       */
      permanent?: boolean;
    }

    /**
     * Navigation
     */
    interface ds_navigation extends Sanity.Document {
      _type: "ds_navigation";

      /**
       * Designsystem navigajsons-struktur - `String`
       */
      title?: string;

      /**
       * Header linker - `Array`
       */
      headings?: Array<Sanity.Keyed<ds_navigation_heading>>;
    }

    /**
     * Komponentartikkel
     */
    interface komponent_artikkel extends Sanity.Document {
      _type: "komponent_artikkel";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url (v2) - `Slug`
       */
      slug_v2?: {
        _type: "slug_v2";
        current: string;
      };

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Sist godkjent - `Object`
       */
      updateInfo?: {
        /**
       * Sist oppdatert - `Date`
Kun synlig for utviklere
       */
        lastVerified?: string;
      };

      /**
       * Kategori - `String`
       */
      kategori?: "core" | "internal";

      /**
       * Metadata - `Object`
       */
      status?: {
        /**
         * Status - `String`
         */
        tag?: "beta" | "new" | "ready" | "deprecated";

        /**
         * Thumbnail - `Image`
         */
        bilde?: {
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        };
      };

      /**
       * Intro - `RegistryReference`
       */
      intro?: intro_komponent;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_komponent;

      /**
       * Kodepakker - `Array`
       */
      kodepakker?: Array<Sanity.Keyed<string>>;

      /**
       * Figma lenke (optional) - `Url`
       */
      figma_link?: string;
    }

    /**
     * Dir/filnavn for kode eksempler
     */
    interface kode_eksempler_fil extends Sanity.Document {
      _type: "kode_eksempler_fil";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Toggle om eksemplet er et dir eller filnavn - `Boolean`
       */
      dir?: boolean;

      /**
       * Filer - `Array`
       */
      filer?: Array<
        Sanity.Keyed<{
          _type: "fil";

          /**
           * Filnavn - `String`
           */
          navn?: string;

          /**
           * Innhold - `String`
           */
          innhold?: string;

          /**
           * Beskrivelse - `Text`
           */
          description?: string;
        }>
      >;
    }

    /**
     * Tokens
     */
    interface token_kategori extends Sanity.Document {
      _type: "token_kategori";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * Kategori - `String`
       */
      kategori?: string;
    }

    /**
     * Autogenerert Propdata
     */
    interface ds_props extends Sanity.Document {
      _type: "ds_props";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Displayname - `String`
       */
      displayname?: string;

      /**
       * Filepath - `String`
       */
      filepath?: string;

      /**
       * props - `Array`
       */
      proplist?: Array<
        Sanity.Keyed<{
          _type: "prop";

          /**
           * Name - `String`
           */
          name?: string;

          /**
           * DefaultValue - `String`
           */
          defaultValue?: string;

          /**
           * Description - `String`
           */
          description?: string;

          /**
           * Required - `Boolean`
           */
          required?: boolean;

          /**
           * Type - `String`
           */
          type?: string;

          /**
           * isRef - `Boolean`
           */
          ref?: boolean;
        }>
      >;
    }

    /**
     * Forside
     */
    interface ds_frontpage extends Sanity.Document {
      _type: "ds_frontpage";

      /**
       * Innhold - `RegistryReference`
       */
      body?: riktekst_enkel;

      /**
       * Cards - `Array`
       */
      cards?: Array<
        Sanity.Keyed<{
          _type: "card";

          /**
           * Lenke - `Reference`
           */
          link_ref?: Sanity.Reference<komponent_artikkel | ds_artikkel>;

          /**
           * Tittel - `String`
           */
          title?: string;

          /**
           * Innhold - `String`
           */
          content?: string;

          /**
           * Pictogram - `Image`
           */
          picture?: {
            asset: Sanity.Asset;
            crop?: Sanity.ImageCrop;
            hotspot?: Sanity.ImageHotspot;

            /**
       * Alt-tekst - `String`
Beskriv bildet for skjermlesere
       */
            title?: string;
          };
        }>
      >;
    }

    /**
     * Komponentartikkel-template
     */
    interface ds_component_template extends Sanity.Document {
      _type: "ds_component_template";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url (v2) - `Slug`
       */
      slug_v2?: {
        _type: "slug_v2";
        current: string;
      };

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Sist godkjent - `Object`
       */
      updateInfo?: {
        /**
       * Sist oppdatert - `Date`
Kun synlig for utviklere
       */
        lastVerified?: string;
      };

      /**
       * Kategori - `String`
       */
      kategori?: "core" | "internal";

      /**
       * Metadata - `Object`
       */
      status?: {
        /**
         * Status - `String`
         */
        tag?: "beta" | "new" | "ready" | "deprecated";

        /**
         * Thumbnail - `Image`
         */
        bilde?: {
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        };
      };

      /**
       * Intro - `RegistryReference`
       */
      intro?: intro_komponent;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_komponent;

      /**
       * Kodepakker - `Array`
       */
      kodepakker?: Array<Sanity.Keyed<string>>;

      /**
       * Figma lenke (optional) - `Url`
       */
      figma_link?: string;
    }

    /**
     * Artikkel
     */
    interface ds_artikkel extends Sanity.Document {
      _type: "ds_artikkel";

      /**
       * Sist godkjent - `Object`
       */
      updateInfo?: {
        /**
       * Sist oppdatert - `Date`
Kun synlig for utviklere
       */
        lastVerified?: string;
      };

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url (v2) - `Slug`
       */
      slug_v2?: {
        _type: "slug_v2";
        current: string;
      };

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Kategori - `String`
       */
      kategori?: "styling" | "tokens" | "staesj" | "guider";

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_ds_artikkel;
    }

    /**
     * Aksel Artikkel
     */
    interface aksel_artikkel extends Sanity.Document {
      _type: "aksel_artikkel";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Sist godkjent - `Object`
       */
      updateInfo?: {
        /**
       * Sist oppdatert - `Date`
Kun synlig for utviklere
       */
        lastVerified?: string;
      };

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Tema - `Array`
Legg til de viktigeste temaene
       */
      tema?: Array<Sanity.KeyedReference<aksel_tema>>;

      /**
       * Ingress - `Text`
Side, innganger og seo description-tag
       */
      ingress?: string;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_aksel;

      /**
       * Relevante artikler - `Array`
Legg til relaterte artikler som du tenker er relevant å lese (maks 3)
       */
      relevante_artikler?: Array<
        Sanity.KeyedReference<
          | komponent_artikkel
          | ds_artikkel
          | aksel_artikkel
          | aksel_blogg
          | aksel_prinsipp
        >
      >;

      /**
       * SEO - `Object`
       */
      seo?: {
        /**
       * Meta/:og description - `Text`
Anbefalt maks 150-160 bokstaver. Erstatter ingress som <meta /> description
       */
        meta?: string;

        /**
       * og:Image - `Image`
Anbefalt størrelse er 1200:630px
       */
        image?: {
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        };
      };
    }

    /**
     * Blogg
     */
    interface aksel_blogg extends Sanity.Document {
      _type: "aksel_blogg";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Ingress - `Text`
Side, innganger og seo description-tag
       */
      ingress?: string;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_aksel;

      /**
       * SEO - `Object`
       */
      seo?: {
        /**
       * Meta/:og description - `Text`
Anbefalt maks 150-160 bokstaver. Erstatter ingress som <meta /> description
       */
        meta?: string;

        /**
       * og:Image - `Image`
Anbefalt størrelse er 1200:630px
       */
        image?: {
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        };
      };
    }

    /**
     * Aksel Tema
     */
    interface aksel_tema extends Sanity.Document {
      _type: "aksel_tema";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * Kort Intro/Oppsummering - `String`
Brukes i kort og innganger
       */
      oppsummering?: string;

      /**
       * Beskrivelse - `RegistryReference`
       */
      beskrivelse?: riktekst_enkel;

      /**
       * Hidden - `Boolean`
       */
      bruk_seksjoner?: boolean;

      /**
       * Shortname - `Slug`
En mer sanitert visning av tema-navnet i url ene
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Ansvarlig for tema - `Reference`
Legg til redaktør som har forvaltningsansvaret for temaet
       */
      ansvarlig?: Sanity.Reference<editor>;

      /**
       * Seksjonering - `Array`
Del inn artiklene i flere seksjoner (vises ikke i preview før publisering desverre)
       */
      seksjoner?: Array<
        Sanity.Keyed<{
          _type: "seksjon";

          /**
           * Tittel - `String`
           */
          title?: string;

          /**
           * Beskrivelse - `RegistryReference`
           */
          beskrivelse?: riktekst_enkel;

          /**
           * Sider - `Array`
           */
          sider?: Array<Sanity.KeyedReference<aksel_artikkel>>;
        }>
      >;

      /**
       * Pictogram - `Image`
       */
      pictogram?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;

        /**
         * Attribution - `String`
         */
        alt?: string;
      };
    }

    /**
     * Aksel Prinsipp
     */
    interface aksel_prinsipp extends Sanity.Document {
      _type: "aksel_prinsipp";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Redaktører - `Array`
Legg til alle som har bidratt med denne siden!
       */
      contributors?: Array<Sanity.KeyedReference<editor>>;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Prinsipp - `Object`
Velg prinsippet siden omhandler
       */
      prinsipp?: {
        /**
         * Velg prinsipp - `String`
         */
        prinsippvalg?: "brukeropplevelse";

        /**
         * Er denne siden hovedsiden til Prinsippet? - `Boolean`
         */
        hovedside?: boolean;
      };

      /**
       * Hero bilde - `RegistryReference`
       */
      hero_bilde?: herobilde;

      /**
       * Ingress - `Text`
Side, innganger og seo description-tag
       */
      ingress?: string;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_prinsipp;

      /**
       * SEO - `Object`
       */
      seo?: {
        /**
       * Meta/:og description - `Text`
Anbefalt maks 150-160 bokstaver. Erstatter ingress som <meta /> description
       */
        meta?: string;

        /**
       * og:Image - `Image`
Anbefalt størrelse er 1200:630px
       */
        image?: {
          asset: Sanity.Asset;
          crop?: Sanity.ImageCrop;
          hotspot?: Sanity.ImageHotspot;
        };
      };
    }

    /**
     * Standalone-sider
     */
    interface aksel_standalone extends Sanity.Document {
      _type: "aksel_standalone";

      /**
       * Publiseringsdato - `Datetime`
Synlig bare for admins. Setter publiseringsdato for dokument
       */
      publishedAt?: string;

      /**
       * Sidetittel - `String`
Bruk en kort og konsis tittel om mulig. Blir satt som `<H1 />` på toppen av siden i URL.
       */
      heading?: string;

      /**
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_aksel;
    }

    type tabell_v2 = {
      _type: "tabell_v2";

      /**
       * Rows - `Array`
       */
      rows?: Array<Sanity.Keyed<tableRow>>;
    };

    type tableRow = {
      _type: "tableRow";

      /**
       * Cells - `Array`
       */
      cells?: Array<Sanity.Keyed<string>>;
    };

    type riktekst_enkel = Array<Sanity.Keyed<Sanity.Block>>;

    type riktekst_aksel = Array<
      | Sanity.Keyed<Sanity.Block>
      | Sanity.Keyed<relatert_innhold>
      | Sanity.Keyed<bilde>
      | Sanity.Keyed<kode>
      | Sanity.Keyed<tips>
      | Sanity.Keyed<do_dont>
      | Sanity.Keyed<accordion>
      | Sanity.Keyed<alert>
      | Sanity.Keyed<tabell_v2>
      | Sanity.Keyed<video>
    >;

    type riktekst_ds_artikkel = Array<
      | Sanity.Keyed<Sanity.Block>
      | Sanity.Keyed<relatert_innhold>
      | Sanity.Keyed<bilde>
      | Sanity.Keyed<kode>
      | Sanity.Keyed<tips>
      | Sanity.Keyed<do_dont>
      | Sanity.Keyed<accordion>
      | Sanity.Keyed<alert>
      | Sanity.Keyed<tabell_v2>
      | Sanity.Keyed<video>
      | Sanity.Keyed<spesial_seksjon>
    >;

    type riktekst_komponent = Array<
      | Sanity.Keyed<Sanity.Block>
      | Sanity.Keyed<relatert_innhold>
      | Sanity.Keyed<bilde>
      | Sanity.Keyed<kode>
      | Sanity.Keyed<tips>
      | Sanity.Keyed<do_dont>
      | Sanity.Keyed<accordion>
      | Sanity.Keyed<alert>
      | Sanity.Keyed<tabell_v2>
      | Sanity.Keyed<video>
      | Sanity.Keyed<props_seksjon>
      | Sanity.Keyed<tastatur_modul>
      | Sanity.Keyed<kode_eksempler>
      | Sanity.Keyed<token_ref>
    >;

    type riktekst_tabell = Array<Sanity.Keyed<Sanity.Block>>;

    type riktekst_prinsipp = Array<
      | Sanity.Keyed<Sanity.Block>
      | Sanity.Keyed<relatert_innhold>
      | Sanity.Keyed<bilde>
      | Sanity.Keyed<kode>
      | Sanity.Keyed<tips>
      | Sanity.Keyed<do_dont>
      | Sanity.Keyed<accordion>
      | Sanity.Keyed<alert>
      | Sanity.Keyed<tabell_v2>
      | Sanity.Keyed<video>
      | Sanity.Keyed<innholdskort>
    >;

    type do_dont = {
      _type: "do_dont";

      /**
       * Do / donts - `Array`
       */
      blokker?: Array<Sanity.Keyed<do_dont_block>>;
    };

    type do_dont_block = {
      _type: "do_dont_block";

      /**
       * Fullwidth - `Boolean`
Tar opp ~ 40% eller 100% av tilgjengelig bredde
       */
      fullwidth?: boolean;

      /**
       * Bilde - `Image`
       */
      picture?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };

      /**
       * alt tekst for bilde - `String`
       */
      alt?: string;

      /**
       * Fritekst - `Text`
Korte konsise beskrivelser. Bruk fullbredde bilde i dodont med egen tekst for lengre forklaringer
       */
      description?: string;

      /**
       * Variant - `String`
       */
      variant?: "do" | "dont" | "warning";
    };

    type bilde = {
      _type: "bilde";
      asset: Sanity.Asset;
      crop?: Sanity.ImageCrop;
      hotspot?: Sanity.ImageHotspot;

      /**
       * Alt-tekst - `String`
Beskriv bildet for skjermlesere
       */
      alt?: string;

      /**
       * Bilde-tekst (optional) - `String`
Dette vil stå under bildet
       */
      caption?: string;

      /**
       * Bildet tar bare ~halve bredden - `Boolean`
       */
      small?: boolean;

      /**
       * Kilde - `Object`
       */
      kilde?: {
        /**
         * Legg til kilde - `Boolean`
         */
        har_kilde?: boolean;

        /**
         * Kilde-prefix - `String`
         */
        prefix?: "FOTO" | "Kilde";

        /**
         * Tekst - `String`
         */
        tekst?: string;

        /**
       * Lenke-kilde - `Url`
Kilde-teksten blir satt som lenke
       */
        link?: string;
      };
    };

    type herobilde = {
      _type: "herobilde";
      asset: Sanity.Asset;
      crop?: Sanity.ImageCrop;
      hotspot?: Sanity.ImageHotspot;

      /**
       * Alt-tekst - `String`
Beskriv bildet for skjermlesere
       */
      alt?: string;
    };

    type alert = {
      _type: "alert";

      /**
       * Variant - `String`
       */
      variant?: "success" | "info" | "warning" | "error";

      /**
       * Heading (optional) - `String`
       */
      heading?: string;

      /**
       * Heading nivå - `String`
       */
      heading_level?: "h3" | "h4";

      /**
       * Innhold - `RegistryReference`
       */
      body?: riktekst_enkel;
    };

    type kode = {
      _type: "kode";

      /**
       * Kode - `RegistryReference`
       */
      code?: any;
    };

    type relatert_innhold = {
      _type: "relatert_innhold";

      /**
       * Lenker til innhold - `Array`
       */
      lenker?: Array<
        Sanity.Keyed<{
          _type: "lenke";

          /**
           * Tittel - `String`
           */
          title?: string;

          /**
           * Intern side i Sanity - `Boolean`
           */
          intern?: boolean;

          /**
           * Lenke til Intern sanity-side - `Reference`
           */
          intern_lenke?: Sanity.Reference<
            | komponent_artikkel
            | ds_artikkel
            | aksel_artikkel
            | aksel_blogg
            | aksel_prinsipp
          >;

          /**
           * Lenke til ekstern side - `Url`
           */
          ekstern_link?: string;

          /**
       * Linker til et eksternt domene - `Boolean`
Sett denne hvis lenken går til en side utenfor aksel.nav.no
       */
          ekstern_domene?: boolean;
        }>
      >;
    };

    type innholdskort = {
      _type: "innholdskort";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Lenke til prinsipp - `Reference`
       */
      lenke?: Sanity.Reference<aksel_prinsipp>;

      /**
       * Innhold - `RegistryReference`
Ikke bruk lenker inne i selve kortet
       */
      body?: riktekst_enkel;
    };

    type intro_komponent = {
      _type: "intro_komponent";

      /**
       * Intro-tekst - `RegistryReference`
       */
      body?: riktekst_enkel;

      /**
       * Egnet til å: - `Array`
       */
      brukes_til?: Array<Sanity.Keyed<string>>;

      /**
       * Vurder noe annet: (optional) - `Array`
       */
      brukes_ikke_til?: Array<Sanity.Keyed<string>>;
    };

    type props_seksjon = {
      _type: "props_seksjon";

      /**
       * Tittel (h2) - `String`
       */
      title?: string;

      /**
       * Props - `Array`
       */
      komponenter?: Array<
        Sanity.Keyed<{
          _type: "komponent";

          /**
       * Komponent navn - `String`
Slik man ville brukt den, eks Accordion.Item
       */
          title?: string;

          /**
           * Bruker komponenten OverridableComponent API-et - `Boolean`
           */
          overridable?: boolean;

          /**
           * Komponent referanse - `Reference`
           */
          propref?: Sanity.Reference<ds_props>;
        }>
      >;
    };

    type accordion = {
      _type: "accordion";

      /**
       * Tittel (optional) - `String`
       */
      title?: string;

      /**
       * Liste - `Array`
Legg til en eller flere elementer
       */
      list?: Array<
        Sanity.Keyed<{
          _type: "element";

          /**
           * Tittel  - `String`
           */
          title?: string;

          /**
           * Innhold - `RegistryReference`
           */
          content?: riktekst_aksel;
        }>
      >;
    };

    type spesial_seksjon = {
      _type: "spesial_seksjon";

      /**
       * Modul - `String`
       */
      modul?: "token_kategori" | "ikonsok" | "komponentoversikt";

      /**
       * Token kategori - `Reference`
       */
      token_ref?: Sanity.Reference<token_kategori>;
    };

    type video = {
      _type: "video";

      /**
       * Bruk Microsoft-streams embed - `Boolean`
       */
      bruk_embed?: boolean;

      /**
       * Iframe - `Text`
Trykk share og legg inn iframe her fra Microsoft-streams. Husk å velge størrelse og slå av autplay og show info!
       */
      embed?: string;

      /**
       * Video i WebM format - `File`
Vi anbefaler å bruke Webm formatet om mulig!
       */
      webm?: {
        asset: Sanity.Asset;
      };

      /**
       * Video i Mp4 format (fallback) - `File`
       */
      fallback?: {
        asset: Sanity.Asset;
      };

      /**
       * Alt tekst for skjermlesere - `String`
       */
      alt?: string;

      /**
       * Videotekst - `String`
Kort beskrivelse som vises rett under videon
       */
      caption?: string;

      /**
       * Transkripsjon - `Text`
Hvis videoen inneholder lyd, anbelfaler vi å skrive en transkripsjon som kan leses under videoen.
       */
      transkripsjon?: string;
    };

    type tips = {
      _type: "tips";

      /**
       * Feedback - `Boolean`
Endrer modul-variant
       */
      eksperiment?: boolean;

      /**
       * Innhold - `RegistryReference`
       */
      body?: riktekst_enkel;
    };

    type tastatur_modul = {
      _type: "tastatur_modul";

      /**
       * Tastatur key + action - `Array`
       */
      tastatur?: Array<
        Sanity.Keyed<{
          _type: "keys";

          /**
           * Key - `String`
           */
          key?: string;

          /**
           * Action - `String`
           */
          action?: string;
        }>
      >;
    };

    type kode_eksempler = {
      _type: "kode_eksempler";

      /**
       * tittel - `String`
       */
      title?: string;

      /**
       * Standalone-eksempel - `Boolean`
Vis bare et spesfikt eksempel
       */
      standalone?: boolean;

      /**
       * Eksempel-navn - `Reference`
       */
      dir?: Sanity.Reference<kode_eksempler_fil>;

      /**
       * Installasjon-snippet - `Reference`
       */
      filnavn?: Sanity.Reference<kode_eksempler_fil>;
    };

    type token_ref = Sanity.Reference<token_kategori>;

    type ds_navigation_heading = {
      _type: "ds_navigation_heading";

      /**
       * Heading tittel - `String`
       */
      title?: string;

      /**
       * Side selve headingen linker til - `Reference`
Husk å legge denne til i menyen også, hvis ikke blir den bare tilgjengelig via headern
       */
      link_ref?: Sanity.Reference<komponent_artikkel | ds_artikkel>;

      /**
       * Meny for denne headingen - `Array`
       */
      menu?: Array<
        | Sanity.Keyed<{
            _type: "item";

            /**
             * Menypunkt tittel - `String`
             */
            title?: string;

            /**
             * Link til side - `Reference`
             */
            link?: Sanity.Reference<komponent_artikkel | ds_artikkel>;
          }>
        | Sanity.Keyed<{
            _type: "subheading";

            /**
             * Subheading - `String`
             */
            title?: string;
          }>
      >;
    };

    type Document =
      | editor
      | redirect
      | ds_navigation
      | komponent_artikkel
      | kode_eksempler_fil
      | token_kategori
      | ds_props
      | ds_frontpage
      | ds_component_template
      | ds_artikkel
      | aksel_artikkel
      | aksel_blogg
      | aksel_tema
      | aksel_prinsipp
      | aksel_standalone;
  }
}

export default SanityT;
