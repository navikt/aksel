export const komponentPage = {
  page: {
    intro: {
      brukes_til: [
        "Ignorere padding fra parent-element",
        "1px optisk alignment",
      ],
      body: [
        {
          _type: "block",
          style: "normal",
          _key: "7cbf219e2bc4",
          markDefs: [],
          children: [
            {
              text: "Enkel primitiv for å legge til negativ margin som lar innhold gli utover parent sin container.",
              _key: "27d39750c8c5",
              _type: "span",
              marks: [],
            },
          ],
        },
      ],
      brukes_ikke_til: [
        "Større layout-endringer, bør ikke brukes som alternativ til gode layout",
        "Bryte konsistens og visuel utforming for NAV og Aksel",
      ],
      _type: "intro_komponent",
    },
    content: [
      {
        children: [
          {
            _key: "be0d1925426c",
            _type: "span",
            marks: [],
            text: "Eksempler",
          },
        ],
        _type: "block",
        style: "h2",
        _key: "15e02c0bf767",
        markDefs: [],
      },
      {
        _type: "kode_eksempler",
        _key: "cfa768b6b8cd",
        dir: {
          _rev: "bUEVLx5dbVNnWIgrSZJjHt",
          _type: "kode_eksempler_fil",
          filer: [
            {
              innhold:
                'import { Bleed, Box, HStack } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <DemoWrapper>\n      <Bleed marginInline="10" asChild>\n        <Box padding="3" className="p" background="surface-alt-3-subtle">\n          <HStack justify="center">marginInline</HStack>\n        </Box>\n      </Bleed>\n    </DemoWrapper>\n  );\n};\n\nfunction DemoWrapper({ children }: { children: React.ReactNode }) {\n  return (\n    <Box background="surface-alt-3" padding="5" borderRadius="large">\n      <Box background="surface-subtle" padding="5" borderRadius="medium">\n        {children}\n      </Box>\n    </Box>\n  );\n}',
              _key: "default",
              title: "default",
              navn: "default",
              index: 0,
            },
            {
              innhold:
                'import { Bleed, Box, HStack, VStack } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <VStack gap="4">\n      <DemoWrapper>\n        <Bleed marginInline="10 0" asChild>\n          <Box padding="3" className="p" background="surface-alt-3-subtle">\n            <HStack justify="center">marginInline start</HStack>\n          </Box>\n        </Bleed>\n      </DemoWrapper>\n      <DemoWrapper>\n        <Bleed marginInline="0 10" asChild>\n          <Box padding="3" className="p" background="surface-alt-3-subtle">\n            <HStack justify="center">marginInline end</HStack>\n          </Box>\n        </Bleed>\n      </DemoWrapper>\n      <DemoWrapper>\n        <Bleed marginBlock="10 0" asChild>\n          <Box padding="3" className="p" background="surface-alt-3-subtle">\n            <HStack justify="center">marginBlock start</HStack>\n          </Box>\n        </Bleed>\n      </DemoWrapper>\n      <DemoWrapper>\n        <Bleed marginBlock="0 10" asChild>\n          <Box padding="3" className="p" background="surface-alt-3-subtle">\n            <HStack justify="center">marginBlock end</HStack>\n          </Box>\n        </Bleed>\n      </DemoWrapper>\n    </VStack>\n  );\n};\n\nfunction DemoWrapper({ children }: { children: React.ReactNode }) {\n  return (\n    <Box background="surface-alt-3" padding="5" borderRadius="large">\n      <Box background="surface-subtle" padding="5" borderRadius="medium">\n        {children}\n      </Box>\n    </Box>\n  );\n}',
              _key: "directions",
              title: "directions",
              navn: "directions",
              index: 1,
            },
            {
              description:
                "Margin block/inline er begge reponsive, som lar deg endre negativ margin dynamiskt basert på brekkpunkter.",
              index: 1,
              innhold:
                'import { Bleed, BodyLong, Box, HStack } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <DemoWrapper>\n      <Bleed marginInline={{ xs: "8", md: "12", lg: "16" }} asChild>\n        <Box padding="3" className="p" background="surface-alt-3-subtle">\n          <HStack justify="center">\n            <BodyLong>xs: 8, md: 12, lg: 16</BodyLong>\n          </HStack>\n        </Box>\n      </Bleed>\n    </DemoWrapper>\n  );\n};\n\nfunction DemoWrapper({ children }: { children: React.ReactNode }) {\n  return (\n    <Box\n      background="surface-alt-3"\n      paddingBlock="4"\n      paddingInline={{ xs: "4", md: "8", lg: "12" }}\n      borderRadius="large"\n    >\n      <Box background="surface-subtle" padding="4" borderRadius="medium">\n        {children}\n      </Box>\n    </Box>\n  );\n}',
              _key: "responsive",
              title: "responsive",
              navn: "responsive",
            },
            {
              innhold:
                'import { Bleed, Box, VStack } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <DemoWrapper>\n      <Bleed marginInline="10" asChild reflectivePadding>\n        <Box className="p" background="surface-alt-3-subtle">\n          reflectivePadding lar innhold forbli der det ville vært uten Bleed\n        </Box>\n      </Bleed>\n      <Bleed marginInline="10" asChild>\n        <Box className="p" background="surface-alt-3-subtle">\n          Uten reflectivePadding\n        </Box>\n      </Bleed>\n    </DemoWrapper>\n  );\n};\n\nfunction DemoWrapper({ children }: { children: React.ReactNode }) {\n  return (\n    <Box background="surface-alt-3" padding="5" borderRadius="large">\n      <Box background="surface-subtle" padding="5" borderRadius="medium">\n        <VStack gap="4">{children}</VStack>\n      </Box>\n    </Box>\n  );\n}',
              _key: "reflective-padding",
              title: "reflective-padding",
              navn: "reflective-padding",
              index: 2,
            },
            {
              navn: "full",
              description:
                "Full lar Bleed bryte ut av parent og dekke hele skjermbredden. Dette kan være nyttig for 'Heroes' eller lignende elementer som ønsker å bryte ut av parent-layout",
              index: 3,
              innhold:
                'import { Bleed, Box, HStack } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <DemoWrapper>\n      <Bleed marginInline="full" asChild>\n        <Box padding="3" className="p" background="surface-alt-3-subtle">\n          <HStack justify="center">Full</HStack>\n        </Box>\n      </Bleed>\n    </DemoWrapper>\n  );\n};\n\nfunction DemoWrapper({ children }: { children: React.ReactNode }) {\n  return (\n    <Box background="surface-alt-3" padding="5" borderRadius="large">\n      <Box background="surface-subtle" padding="5" borderRadius="medium">\n        {children}\n      </Box>\n    </Box>\n  );\n}',
              _key: "full",
              title: "full",
            },
            {
              _key: "as-child",
              title: "as-child",
              navn: "as-child",
              description:
                "Vi anbefaler å bruke 'asChild'-prop der mulig. Dette reduserer dom-noder og forenkler output. For at Bleed + child-komponent skal fungere må child kunne ta inn 'className' og 'style' som prop.",
              index: 4,
              innhold:
                'import { Bleed, Box, HStack } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <DemoWrapper>\n      <Bleed marginInline="10" asChild>\n        <Box padding="3" className="p" background="surface-alt-3-subtle">\n          <HStack justify="center">Med asChild</HStack>\n        </Box>\n      </Bleed>\n    </DemoWrapper>\n  );\n};\n\nfunction DemoWrapper({ children }: { children: React.ReactNode }) {\n  return (\n    <Box background="surface-alt-3" padding="5" borderRadius="large">\n      <Box background="surface-subtle" padding="5" borderRadius="medium">\n        {children}\n      </Box>\n    </Box>\n  );\n}',
            },
            {
              navn: "optical-alignment",
              description:
                "Noen ganger er det den ene pixelen som skal til for å optisk sentrere elementer.",
              index: 5,
              innhold:
                'import { MagnifyingGlassIcon } from "@navikt/aksel-icons";\nimport { Bleed, Box, HStack, VStack } from "@navikt/ds-react";\n\nconst Example = () => {\n  return (\n    <VStack gap="6" align="start">\n      <HStack gap="2" align="center">\n        Med\n        <Box\n          paddingBlock="1"\n          paddingInline="2"\n          background="surface-alt-3-subtle"\n          borderRadius="full"\n        >\n          <Bleed marginBlock="px 0" asChild>\n            <MagnifyingGlassIcon aria-hidden fontSize="1.25rem" />\n          </Bleed>\n        </Box>\n      </HStack>\n\n      <HStack gap="2" align="center">\n        Uten\n        <Box\n          paddingBlock="1"\n          paddingInline="2"\n          background="surface-alt-3-subtle"\n          borderRadius="full"\n        >\n          <MagnifyingGlassIcon aria-hidden fontSize="1.25rem" />\n        </Box>\n      </HStack>\n    </VStack>\n  );\n};',
              _key: "optical-alignment",
              title: "optical-alignment",
            },
          ],
          variant: "eksempler",
          _id: "kode_eksempelid_primitivebleed",
          title: "primitive-bleed",
          _updatedAt: "2023-11-07T12:53:02Z",
          _createdAt: "2023-09-27T14:02:08Z",
        },
        title: "Kode-eksempler",
        markDefs: null,
      },
      {
        _type: "block",
        style: "h2",
        _key: "8e900c15ffa9",
        markDefs: [],
        children: [
          {
            _key: "09f2b93e05d9",
            _type: "span",
            marks: [],
            text: "Varianter",
          },
        ],
      },
      {
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Margin",
            _key: "83a4b9932eb30",
          },
        ],
        _type: "block",
        style: "h3",
        _key: "3fa1893ab0eb",
      },
      {
        _key: "f479f801ce60",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Bleed legger til negativ margin gjennom bruk av ",
            _key: "ff405137f0f1",
          },
          {
            _type: "span",
            marks: ["code"],
            text: "marginBlock",
            _key: "20d2854563e1",
          },
          {
            marks: [],
            text: " eller ",
            _key: "45a869a200e0",
            _type: "span",
          },
          {
            text: "marginInline",
            _key: "11c1c5f2643c",
            _type: "span",
            marks: ["code"],
          },
          {
            _type: "span",
            marks: [],
            text: "-prop. Disse følger tokens for spacing, men har i tillegg 2 ekstra muligheter ",
            _key: "ec48c217cf68",
          },
          {
            text: "full",
            _key: "f85fc1455ded",
            _type: "span",
            marks: ["code"],
          },
          {
            _key: "5a22a1a75d76",
            _type: "span",
            marks: [],
            text: " og ",
          },
          {
            marks: ["code"],
            text: "px.",
            _key: "5c52a1b46e27",
            _type: "span",
          },
        ],
        _type: "block",
        style: "normal",
      },
      {
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Full",
            _key: "5c38cbd97742",
          },
        ],
        _type: "block",
        style: "h4",
        _key: "8b528cc39cd5",
      },
      {
        children: [
          {
            _type: "span",
            marks: [],
            text: "Bruker teknikken ",
            _key: "5d58ecd2f7a5",
          },
          {
            text: "calc((100vw - 100%)/-2)",
            _key: "7a99fe2c6e09",
            _type: "span",
            marks: ["code"],
          },
          {
            _key: "d24ea9749110",
            _type: "span",
            marks: [],
            text: " for å strekke seg helt ut i kanten av siden.",
          },
        ],
        _type: "block",
        style: "normal",
        _key: "6ff682e4c029",
        markDefs: [],
      },
      {
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Px",
            _key: "c85073caaea0",
          },
        ],
        _type: "block",
        style: "h4",
        _key: "5bb404c3f016",
      },
      {
        children: [
          {
            text: "Er lagt til som en enkel metode å optisk justere elementer, noe du kan ",
            _key: "8d7eeeff9d31",
            _type: "span",
            marks: [],
          },
          {
            marks: ["872e3e62c3a1"],
            text: "lese mer om fra Slava Shestopalov",
            _key: "f4ddfc2746a3",
            _type: "span",
          },
          {
            text: ".",
            _key: "d9f6fc96cfc1",
            _type: "span",
            marks: [],
          },
        ],
        _type: "block",
        style: "normal",
        _key: "9b443252a856",
        markDefs: [
          {
            _type: "link",
            href: "https://medium.com/design-bridges/optical-effects-9fca82b4cd9a",
            _key: "872e3e62c3a1",
          },
        ],
      },
      {
        style: "h3",
        _key: "5e3def4c77b1",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Reflective padding",
            _key: "320ccb3eef730",
          },
        ],
        _type: "block",
      },
      {
        _type: "block",
        style: "normal",
        _key: "51cd8381560c",
        markDefs: [],
        children: [
          {
            text: "Lar deg legge på negativ margin, men erstatter også den med padding i samme slengen. Dette kan være nyttig i tilfeller der du ønsker at bakgrunnen til elementet skal gå helt ut i kantene, men innholdet skal forbli der det var før du la på Bleed.",
            _key: "cd2423d892a6",
            _type: "span",
            marks: [],
          },
        ],
      },
      {
        _key: "1a95c50cf6fc",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "As child",
            _key: "2fa0e5238338",
          },
        ],
        _type: "block",
        style: "h3",
      },
      {
        _key: "210d620e01c8",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Når satt, vil rendre Bleed som nærmeste child-element. Dette merger klasser, stiler og event-handlers.",
            _key: "847c6aeb9a5d",
          },
        ],
        _type: "block",
        style: "normal",
      },
      {
        title: "Do/Don't",
        code: {
          code: '// Do\n<Bleed>\n  <div className="box-1">Box</div>\n</Bleed>\n\n<Bleed>\n  <Box>Box</div>\n</Bleed>\n\n// Don\'t\n<Bleed>\n  <div className="box-1">Box</div>\n  <div className="box-2">Box</div>\n</Bleed>\n\n<Bleed>\n  <>\n    <div className="box-1">Box</div>\n    <div className="box-1">Box</div>\n  </>\n</Bleed>\n',
          _type: "code",
          language: "tsx",
        },
        _type: "kode",
        _key: "344581f74d47",
        markDefs: null,
        ref: null,
      },
      {
        children: [
          {
            _key: "b3f032f1c750",
            _type: "span",
            marks: [],
            text: "I tilfellene der man bruker ",
          },
          {
            _type: "span",
            marks: ["code"],
            text: "asChild",
            _key: "f7ed4ddce5b9",
          },
          {
            _type: "span",
            marks: [],
            text: " må også child-elementet akseptere + sette ",
            _key: "aba1202b60d9",
          },
          {
            _type: "span",
            marks: ["code"],
            text: "className",
            _key: "8c58ec516cea",
          },
          {
            _key: "ed6a2ad36b87",
            _type: "span",
            marks: [],
            text: " og ",
          },
          {
            _key: "a12d1bde77a7",
            _type: "span",
            marks: ["code"],
            text: "style",
          },
          {
            _type: "span",
            marks: [],
            text: ". Dette blir håndtert automatisk hvis child er en Aksel-komponent.",
            _key: "78f1c27d54b0",
          },
        ],
        _type: "block",
        style: "normal",
        _key: "8de5d4f96a81",
        markDefs: [],
      },
      {
        children: [
          {
            text: "Props",
            _key: "64ce56fe8853",
            _type: "span",
            marks: [],
          },
        ],
        _type: "block",
        style: "h2",
        _key: "8684a3062267",
        markDefs: [],
      },
      {
        _key: "c2df6c2b17ff",
        title: "Props",
        komponenter: [
          {
            overridable: false,
            _key: "158c48d4e3d2",
            title: "Bleed",
            propref: {
              _createdAt: "2023-10-11T08:03:19Z",
              displayname: "Bleed",
              _id: "7271272800_5826054424245311",
              _rev: "Ya4H8fqi7LLzUMMGwMuJ4N",
              _type: "ds_props",
              proplist: [
                {
                  defaultValue: null,
                  _type: "prop",
                  name: "marginInline",
                  description:
                    "**Negative** horizontal margin around children.\nAccepts a spacing token or an object of spacing tokens for different breakpoints.\n@example marginInline='4'\nmarginInline='4 5'\nmarginInline={{xs: '0 32', sm: '3', md: '4 5', lg: '5', xl: '6'}}",
                  _key: "marginInline0",
                  type: 'ResponsiveProp<BleedSpacingInline | "0 0" | "0 full" | "0 px" | "0 05" | "0 1" | "0 1-alt" | "0 2" | "0 3" | "0 4" | "0 5" | "0 6" | "0 7" | "0 8" | "0 9" | "0 10" | "0 11" | ... 512 more ... | "32 32">',
                  required: false,
                  ref: false,
                },
                {
                  name: "marginBlock",
                  description:
                    "**Negative** vertical margin around children.\nAccepts a spacing token or an object of spacing tokens for different breakpoints.\n@example marginBlock='4'\nmarginBlock='4 5'\nmarginBlock={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}",
                  _key: "marginBlock1",
                  type: 'ResponsiveProp<"0 0" | "0 px" | "0 05" | "0 1" | "0 1-alt" | "0 2" | "0 3" | "0 4" | "0 5" | "0 6" | "0 7" | "0 8" | "0 9" | "0 10" | "0 11" | "0 12" | "0 14" | "0 16" | "0 18" | "0 20" | "0 24" | ... 463 more ... | BleedSpacingBlock>',
                  required: false,
                  ref: false,
                  defaultValue: null,
                  _type: "prop",
                },
                {
                  _type: "prop",
                  name: "reflectivePadding",
                  description:
                    "When true, set the padding to mirror the margin.\nThis maintains the apparent width of the element prior to adding Bleed.\nWhen this is used with `asChild`, it will overwrite the padding of the child.",
                  _key: "reflectivePadding2",
                  type: "boolean",
                  required: false,
                  ref: false,
                  defaultValue: null,
                },
                {
                  _type: "prop",
                  name: "asChild",
                  description:
                    "When true, the Bleed will render as its child. This merges classes, styles and event handlers.",
                  _key: "asChild3",
                  type: "boolean",
                  required: false,
                  ref: false,
                  defaultValue: null,
                },
                {
                  required: false,
                  ref: false,
                  defaultValue: null,
                  _type: "prop",
                  name: "className",
                  description: "",
                  _key: "className4",
                  type: "string",
                },
                {
                  _key: "ref5",
                  type: "Ref<HTMLDivElement>",
                  required: false,
                  ref: true,
                  defaultValue: null,
                  _type: "prop",
                  name: "ref",
                  description:
                    "Allows getting a ref to the component instance.\nOnce the component unmounts, React will set `ref.current` to `null` (or call the ref with `null` if you passed a callback ref).\n@see https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom",
                },
              ],
              filepath: "src/layout/bleed/Bleed.tsx",
              title: "Bleed",
              _updatedAt: "2023-10-23T11:20:02Z",
            },
            _type: "komponent",
          },
        ],
        _type: "props_seksjon",
        markDefs: null,
      },
    ],
    _type: "komponent_artikkel",
  },
};

export const godPraksisPage = {
  page: {
    _type: "aksel_artikkel",
    content: [
      {
        _key: "599ee3095ef9",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Snarveier for NAV-ansatte",
            _key: "e8e4b66c0596",
          },
        ],
        _type: "block",
        style: "h2",
      },
      {
        markDefs: [],
        children: [
          {
            _key: "81da540c071a",
            _type: "span",
            marks: [],
            text: "Vi bruker UXtweak til å oppdage struktur med kortsortering.",
          },
        ],
        _type: "block",
        style: "normal",
        _key: "9b5bc652d09f",
      },
      {
        _type: "block",
        style: "normal",
        _key: "649dffdfc22e",
        listItem: "bullet",
        markDefs: [
          {
            href: "https://app.uxtweak.com/dashboard",
            _key: "a043ce43f230",
            blank: true,
            _type: "link",
          },
        ],
        children: [
          {
            _type: "span",
            marks: ["a043ce43f230"],
            text: "Logg inn på UXtweak",
            _key: "830b7c792af2",
          },
          {
            _type: "span",
            marks: [],
            text: " (logg inn med brukernavn og passord)",
            _key: "fddb692e8625",
          },
        ],
        level: 1,
      },
      {
        children: [
          {
            _type: "span",
            marks: ["6fbaa9775e7f"],
            text: "Bestill tilgang",
            _key: "dcda66db92c1",
          },
        ],
        level: 1,
        _type: "block",
        style: "normal",
        _key: "15007ff2fd84",
        listItem: "bullet",
        markDefs: [
          {
            blank: true,
            _type: "link",
            href: "https://jira.adeo.no/plugins/servlet/desk/portal/581/create/2641",
            _key: "6fbaa9775e7f",
          },
        ],
      },
      {
        level: 1,
        _type: "block",
        style: "normal",
        _key: "5480caffbdab",
        listItem: "bullet",
        markDefs: [
          {
            blank: true,
            _type: "link",
            href: "https://jira.adeo.no/plugins/servlet/desk/portal/581/create/4322",
            _key: "e0fe0f6966e6",
          },
        ],
        children: [
          {
            _type: "span",
            marks: ["e0fe0f6966e6"],
            text: "Bestill opplæring",
            _key: "e91e233b73b4",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        _key: "4fc3b5906fb1",
        listItem: "bullet",
        markDefs: [
          {
            blank: true,
            _type: "link",
            href: "https://jira.adeo.no/plugins/servlet/desk/portal/581/create/4323",
            _key: "aec440f6e1a3",
          },
          {
            blank: false,
            _type: "link",
            href: "https://nav-it.slack.com/archives/C02UGFS2J4B",
            _key: "22067e6f553e",
          },
        ],
        children: [
          {
            _type: "span",
            marks: ["aec440f6e1a3"],
            text: "Kontakt oss via Porten",
            _key: "51be74b6695e",
          },
          {
            _type: "span",
            marks: [],
            text: " eller ",
            _key: "d6f2dad88af0",
          },
          {
            marks: ["22067e6f553e"],
            text: "#ResearchOps",
            _key: "410451f122c3",
            _type: "span",
          },
          {
            _key: "24fe1dea14ae",
            _type: "span",
            marks: [],
            text: " på Slack",
          },
        ],
        level: 1,
      },
      {
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Kortsorteringsmetoden ",
            _key: "f10d2bfa1604",
          },
        ],
        _type: "block",
        style: "h2",
        _key: "84d29cf40358",
      },
      {
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Inviter brukerne dine til å sortere innholdet på en måte som er logisk for dem, så får du en informasjonsstruktur som folk klarer å finne frem i.",
            _key: "f20ab4464ce3",
          },
        ],
        _type: "block",
        style: "normal",
        _key: "6a18784d0118",
      },
      {
        markDefs: [],
        children: [
          {
            _key: "b98898ec6c97",
            _type: "span",
            marks: [],
            text: "Kortsorteringsmetoden går ut på å la folk sortere kort som representerer innhold eller funksjoner, slik de mener det er logisk. Kortsortering er altså fint å bruke tidlig i prosessen når du skal etablere en innholdsstruktur, eller når du vil rokkere om på innhold du allerede har.",
          },
        ],
        _type: "block",
        style: "normal",
        _key: "d8eacc0007e7",
      },
      {
        children: [
          {
            _key: "prvhlB2F8WFiBJDJ7g35tx",
            _type: "span",
            marks: [],
            text: "Hvordan?",
          },
        ],
        _type: "block",
        style: "h2",
        _key: "1584d5776831",
        markDefs: [],
      },
      {
        _key: "2a83c55dc3ea",
        listItem: "number",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Lag ett kort per innholdsenhet eller funksjon. Det gjør du kort sagt ved å skrive navnet på en lapp (fysisk eller digitalt). Dersom du jobber med innhold til folk som venter barn, kan eksempler på slike kort kan være ‘engangsstønad’, ‘svangerskapspenger’ eller ‘foreldrepengeplanlegger’.",
            _key: "007c94074e68",
          },
        ],
        level: 1,
        _type: "block",
        style: "normal",
      },
      {
        listItem: "number",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Be brukerne legge kortene de synes hører sammen i samme bunke.",
            _key: "6ac8eed83aaa",
          },
        ],
        level: 1,
        _type: "block",
        style: "normal",
        _key: "a906ea01f7b7",
      },
      {
        markDefs: [],
        children: [
          {
            text: "Åpen kortsortering",
            _key: "b6dd6afef64f",
            _type: "span",
            marks: [],
          },
        ],
        _type: "block",
        style: "h3",
        _key: "b8c63517f2eb",
      },
      {
        style: "normal",
        _key: "820e03753fa3",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "I åpen kortsortering definerer deltagerne kategoriene selv. Det vil si at de selv lager ‘overskriftene’ som kortene skal ligge under, for eksempel at kategorien for ‘foreldrepengeplanlegger’ bør være ‘verktøy’. En åpen kortsortering vil gi deg nyttige innspill til hva du bør kalle kategoriene dine og hva slags innhold som bør ligge under hver av dem.",
            _key: "ba9ed1ecd66c",
          },
        ],
        _type: "block",
      },
      {
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Lukket kortsortering",
            _key: "2cd6be8b41c7",
          },
        ],
        _type: "block",
        style: "h3",
        _key: "14d0e334df5b",
      },
      {
        _type: "block",
        style: "normal",
        _key: "9ed5c88fd871",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "I en lukket kortsortering lager du kategoriene på forhånd, og ber brukerne legge kortene der de synes de hører hjemme. Eksempler på kategorier kan være ‘Verktøy’, ‘Stønader’, ‘Skjemaer’ etc., alt ettersom hva du jobber med.",
            _key: "0dd78f65c340",
          },
        ],
      },
      {
        style: "h2",
        _key: "1ce7642c1329",
        markDefs: [],
        children: [
          {
            _key: "prvhlB2F8WFiBJDJ7g362L",
            _type: "span",
            marks: [],
            text: "Gjennomføring",
          },
        ],
        _type: "block",
      },
      {
        style: "h3",
        _key: "785ef85fb951",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Kortsortering med digitale verktøy",
            _key: "4aabee5be3af",
          },
        ],
        _type: "block",
      },
      {
        markDefs: [],
        children: [
          {
            marks: [],
            text: "Vi bruker UXtweak til kortsortering i NAV. Her kan du gjennomføre både åpne og lukkede kortsorteringsøvelser.",
            _key: "94163d2003fd",
            _type: "span",
          },
        ],
        _type: "block",
        style: "normal",
        _key: "72cbbfdc2006",
      },
      {
        children: [
          {
            _type: "span",
            marks: [],
            text: "Følg oppsettet inne i verktøyet, publiser undersøkelsen og sørg for at den blir aktiv på riktig sted av nettstedet. Lenken til undersøkelsen deler du slik du foretrekker, enten det er gjennom en pop-up i ",
            _key: "12b485849879",
          },
          {
            _key: "1aa18fc985d1",
            _type: "span",
            marks: ["d9e3c654dfe2"],
            text: "Hotjar",
          },
          {
            text: ", en artikkelside på nettstedet eller i en annen kanal som er riktig for din målgruppe.",
            _key: "1e3b6d2b868e",
            _type: "span",
            marks: [],
          },
        ],
        _type: "block",
        style: "normal",
        _key: "eb1cb3f9e7b9",
        markDefs: [
          {
            reference: {
              _ref: "42832bb2-0bce-464a-8f90-d255ecd7c497",
              _type: "reference",
            },
            _type: "internalLink",
            _key: "d9e3c654dfe2",
            slug: {
              current: "god-praksis/artikler/oppsett-og-bruk-av-hotjar",
              _type: "slug",
            },
          },
        ],
      },
      {
        children: [
          {
            _type: "span",
            marks: [],
            text: "Når du har hentet inn et representativt antall svar, avpubliserer du undersøkelsen. Verktøyet vil nå kunne fortelle deg blant annet hvor mange som fullførte testen og hvordan de valgte å sortere innhold og kategorier.",
            _key: "022120090b73",
          },
        ],
        _type: "block",
        style: "normal",
        _key: "05d532b7d93b",
        markDefs: [],
      },
      {
        _key: "f151fe1f55ea",
        markDefs: [],
        children: [
          {
            marks: [],
            text: "Fysisk kortsortering",
            _key: "6c2f465d9840",
            _type: "span",
          },
        ],
        _type: "block",
        style: "h3",
      },
      {
        markDefs: [],
        children: [
          {
            text: "Kortsortering egner seg også fint som en fysisk aktivitet. Lag lapper med de ulike innholdselementene, og gi eventuelt også testpersonene noen tomme lapper (til å lage egne kategorier) og en tusj. Husk å ta bilde av resultatet!",
            _key: "1316fa18b20d",
            _type: "span",
            marks: [],
          },
        ],
        _type: "block",
        style: "normal",
        _key: "fb33e96380d2",
      },
      {
        _key: "1cb00e721eef",
        markDefs: [],
        children: [
          {
            _type: "span",
            marks: [],
            text: "Fordelen med fysisk kortsortering er at du kan få mer innsikt i hvordan testpersonen resonnerer enn i en digital sortering. Øvelsen egner seg også som en gruppeaktivitet, der alle i arbeidsgruppen sorterer for seg og deretter deler resultatet med hverandre.",
            _key: "6cbc8fcf54f1",
          },
        ],
        _type: "block",
        style: "normal",
      },
    ],
  },
};
