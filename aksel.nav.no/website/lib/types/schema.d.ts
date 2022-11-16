/// <reference types="@sanity-codegen/types" />

declare namespace SanityT {
  namespace Schema {
    /**
     * Forside
     */
    interface vk_frontpage extends Sanity.Document {
      _type: "vk_frontpage";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Beskrivelse - `RegistryReference`
       */
      beskrivelse?: riktekst_enkel;

      /**
       * Brukeropplevelse - `Object`
       */
      prinsipp_1?: {
        /**
         * Vis på forside - `Boolean`
         */
        vis?: boolean;

        /**
         * Beskrivelse - `RegistryReference`
         */
        beskrivelse?: riktekst_enkel;

        /**
         * Hovedside - `Reference`
         */
        hovedside?: Sanity.Reference<aksel_prinsipp>;

        /**
       * Undersider - `Array`
Rekkefølge bestemmer rekkefølgen på forsiden!
       */
        undersider?: Array<Sanity.KeyedReference<aksel_prinsipp>>;
      };

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
     * Navigation
     */
    interface navigation extends Sanity.Document {
      _type: "navigation";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Sidemeny - `Array`
Linker eller dropdowns med linker. Maks dybde på 2 dropdowns er støttet. Sider må være publisert før de kan linkes her.
       */
      sidemenu?: Array<
        Sanity.Keyed<navigation_dropdown> | Sanity.Keyed<navigation_link>
      >;
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
     * Fargekategori
     */
    interface ds_color_categories extends Sanity.Document {
      _type: "ds_color_categories";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Beskrivelse - `RegistryReference`
       */
      description?: riktekst_enkel;

      /**
       * Farger - `Array`
       */
      colors?: Array<Sanity.Keyed<ds_color>>;
    }

    /**
     * Tokens
     */
    interface ds_tokens extends Sanity.Document {
      _type: "ds_tokens";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * Verdi - `String`
       */
      token?: string;

      /**
       * Faktisk verdi - `String`
       */
      raw?: string;

      /**
       * Parent - `String`
       */
      parent?: string;

      /**
       * Beskrivelse - `String`
       */
      beskrivelse?: string;

      /**
       * Autogenerert - `Boolean`
       */
      autogenerated?: boolean;
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
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Metadata - `Object`
       */
      status?: {
        /**
         * Status - `String`
         */
        tag?: "beta" | "new" | "ready" | "deprecated";

        /**
         * Thumbnail/og-bilde - `Image`
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
      bruk_tab?: riktekst_komponent;

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
       * url - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Metadata - `Object`
       */
      status?: {
        /**
         * Status - `String`
         */
        tag?: "beta" | "new" | "ready" | "deprecated";

        /**
         * Thumbnail/og-bilde - `Image`
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
      bruk_tab?: riktekst_komponent;

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
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;

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
       * Layout - `String`
'Full' bruker hele bredden, men fjerner table of content (bruk bare for eks ikonside eller komponentvisning)
       */
      layout?: "full" | "default";

      /**
       * Bruk Tabs - `Boolean`
       */
      artikkel_type?: boolean;

      /**
       * Innhold - `RegistryReference`
       */
      content?: riktekst_ds_artikkel;

      /**
       * Innhold i Tabs - `Array`
       */
      content_tabs?: Array<
        Sanity.Keyed<{
          _type: "tab";

          /**
       * Tittel - `String`
Innhold vil da legges under url/tab-tittel
       */
          title?: string;

          /**
           * Innhold - `RegistryReference`
           */
          content?: riktekst_ds_artikkel;
        }>
      >;

      /**
       * Tilbakemeldinger - `Object`
       */
      metadata_feedback?: {
        /**
       * Skjul artikkel feedback modul - `Boolean`
Gjemmer <<Var denne artikkelen til hjelp?>> modulen.
       */
        hide_feedback?: boolean;
      };
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

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
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

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
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
       * Ansvarlig for tema - `Reference`
Legg til redaktør som har forvaltningsansvaret for temaet
       */
      ansvarlig?: Sanity.Reference<editor>;

      /**
       * Bruk seksjonsinndeling - `Boolean`
Vil ikke vise artikler som ikke er lagt til i seksjoner hvis valgt!
       */
      bruk_seksjoner?: boolean;

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

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
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

      /**
       * Migrert riktekst - `Boolean`
       */
      isMigrated?: boolean;
    }

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
      | Sanity.Keyed<tabell>
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
      | Sanity.Keyed<tabell>
      | Sanity.Keyed<video>
      | Sanity.Keyed<tokens>
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
      | Sanity.Keyed<tabell>
      | Sanity.Keyed<video>
      | Sanity.Keyed<props_seksjon>
      | Sanity.Keyed<tastatur_modul>
      | Sanity.Keyed<tokens>
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
      | Sanity.Keyed<tabell>
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

    type tabell = {
      _type: "tabell";

      /**
       * Tittel (optional) - `String`
Gi tabellen et navn for å lettere finne den
       */
      title?: string;

      /**
       * Tabell - `RegistryReference`
       */
      powerTable?: any;
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
      modul?:
        | "farge_kategori"
        | "token_kategori"
        | "ikonsok"
        | "endringslogg"
        | "komponentoversikt";

      /**
       * Farge kategori - `Reference`
       */
      farge_ref?: Sanity.Reference<ds_color_categories>;

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

    type tokens = {
      _type: "tokens";

      /**
       * Tittel/beskrivelse - `String`
       */
      title?: string;

      /**
       * Tokens - `Array`
       */
      tokenlist?: Array<Sanity.KeyedReference<ds_tokens>>;
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
       * Installasjon-snippet - `Reference`
       */
      dir?: Sanity.Reference<kode_eksempler_fil>;

      /**
       * Installasjon-snippet - `Reference`
       */
      filnavn?: Sanity.Reference<kode_eksempler_fil>;
    };

    type token_ref = Sanity.Reference<token_kategori>;

    type navigation_link = {
      _type: "navigation_link";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Link - `Reference`
       */
      link_ref?: Sanity.Reference<komponent_artikkel | ds_artikkel>;
    };

    type navigation_dropdown = {
      _type: "navigation_dropdown";

      /**
       * Tittel - `String`
       */
      title?: string;

      /**
       * Meny - `Array`
       */
      dropdown?: Array<
        Sanity.Keyed<navigation_link> | Sanity.Keyed<navigation_dropdown>
      >;
    };

    type ds_color = {
      _type: "ds_color";

      /**
       * Navn - `String`
       */
      title?: string;

      /**
       * CSS variabelnavn - `String`
       */
      full_title?: string;

      /**
       * Fargetype/nivå - `String`
       */
      color_type?: "global" | "semantic";

      /**
       * Brukt fargenavn - `String`
       */
      color_name?: string;

      /**
       * Fargeroller - `Array`
       */
      color_roles?: Array<Sanity.Keyed<string>>;

      /**
       * Brukt farge - `String`
       */
      color_value?: string;

      /**
       * Fargeindeks - `Number`
Brukes for å endre rekkefølgen på listen. Farger med indeks 0 vil være først, større tall sorteres under der igjen
       */
      color_index?: number;
    };

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
      | vk_frontpage
      | editor
      | navigation
      | redirect
      | ds_color_categories
      | ds_tokens
      | token_kategori
      | kode_eksempler_fil
      | ds_props
      | ds_component_template
      | ds_frontpage
      | ds_navigation
      | komponent_artikkel
      | ds_artikkel
      | aksel_artikkel
      | aksel_blogg
      | aksel_tema
      | aksel_prinsipp
      | aksel_standalone;
  }
}

export default SanityT;
