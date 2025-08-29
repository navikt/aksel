import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React from "react";
import { LinkIcon } from "@navikt/aksel-icons";
import { VStack } from "../../layout/stack";
import { Link } from "../../link";
import FormSummary from "./FormSummary";

const meta: Meta<typeof FormSummary> = {
  title: "ds-react/FormSummary",
  component: FormSummary,
  decorators: [
    (story) => (
      <div style={{ width: 600, maxWidth: "100%", margin: "0 auto" }}>
        {story()}
      </div>
    ),
  ],
  parameters: { layout: "padded", chromatic: { disable: true } },
};
export default meta;

export const Default: StoryFn<typeof FormSummary> = () => (
  <FormSummary>
    <FormSummary.Header>
      <FormSummary.Heading level="2">Personalia</FormSummary.Heading>
    </FormSummary.Header>

    <FormSummary.Answers>
      <FormSummary.Answer>
        <FormSummary.Label>Navn</FormSummary.Label>
        <FormSummary.Value>Ola Nordmann</FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Adresse</FormSummary.Label>
        <FormSummary.Value>
          Gate 123
          <br />
          1234 Sted
        </FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Fødselsnummer</FormSummary.Label>
        <FormSummary.Value>12345678910</FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Barn nr. 1</FormSummary.Label>
        <FormSummary.Value>
          <FormSummary.Answers>
            <FormSummary.Answer>
              <FormSummary.Label>Navn</FormSummary.Label>
              <FormSummary.Value>Kari Nordmann</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
              <FormSummary.Label>Kjønn</FormSummary.Label>
              <FormSummary.Value>Jente</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
              <FormSummary.Label>Alder</FormSummary.Label>
              <FormSummary.Value>6</FormSummary.Value>
            </FormSummary.Answer>
          </FormSummary.Answers>
        </FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Barn nr. 2</FormSummary.Label>
        <FormSummary.Value>
          <FormSummary.Answers>
            <FormSummary.Answer>
              <FormSummary.Label>Navn</FormSummary.Label>
              <FormSummary.Value>Per Nordmann</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
              <FormSummary.Label>Kjønn</FormSummary.Label>
              <FormSummary.Value>Gutt</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
              <FormSummary.Label>Alder</FormSummary.Label>
              <FormSummary.Value>7</FormSummary.Value>
            </FormSummary.Answer>
          </FormSummary.Answers>
        </FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Kontaktinformasjon</FormSummary.Label>
        <FormSummary.Value>
          <Link>Fyll ut kontaktinformasjon</Link>
        </FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Hvordan vil du bli varslet?</FormSummary.Label>
        <FormSummary.Value>E-post</FormSummary.Value>
        <FormSummary.Value>SMS</FormSummary.Value>
      </FormSummary.Answer>
    </FormSummary.Answers>
    <FormSummary.Footer>
      <FormSummary.EditLink href="#" />
    </FormSummary.Footer>
  </FormSummary>
);

export const LongTexts: StoryFn<typeof FormSummary> = () => (
  <FormSummary>
    <FormSummary.Header>
      <FormSummary.Heading level="2">
        Arbeidsforhold som du har i eller utenfor EØS-området
      </FormSummary.Heading>
    </FormSummary.Header>
    <FormSummary.Answers>
      <FormSummary.Answer>
        <FormSummary.Label>
          Har du jobbet i et annet EØS-land, Sveits eller Storbritannia i løpet
          av de siste 36 månedene? Om ja, hvilket land og hvor lenge jobbet du
          der? Kan du fortelle litt om hva du jobbet med?
        </FormSummary.Label>
        <FormSummary.Value>
          Nei, jeg har ikke jobbet i et annet EØS-land, Sveits eller
          Storbritannia i løpet av de siste 36 månedene. Og jeg har heller ikke
          jobbet i Norge i løpet av de siste 36 månedene. Men jeg har jobbet i
          et annet land utenfor EØS-området. Det var i Sør-Korea, og jeg jobbet
          som lærer på en internasjonal skole. Jeg jobbet der i 12 måneder, og
          det var en veldig spennende opplevelse. Jeg lærte mye om koreansk
          kultur og språk, og jeg fikk mange nye venner. Jeg savner Sør-Korea
          veldig mye, og jeg håper å kunne dra tilbake.
          <FormSummary.Answers>
            <FormSummary.Answer>
              <FormSummary.Label>
                Har du jobbet i et annet EØS-land, Sveits eller Storbritannia i
                løpet av de siste 36 månedene? Om ja, hvilket land og hvor lenge
                jobbet du der? Kan du fortelle litt om hva du jobbet med?
              </FormSummary.Label>
              <FormSummary.Value>
                Nei, jeg har ikke jobbet i et annet EØS-land, Sveits eller
                Storbritannia i løpet av de siste 36 månedene. Og jeg har heller
                ikke jobbet i Norge i løpet av de siste 36 månedene. Men jeg har
                jobbet i et annet land utenfor EØS-området. Det var i Sør-Korea,
                og jeg jobbet som lærer på en internasjonal skole. Jeg jobbet
                der i 12 måneder, og det var en veldig spennende opplevelse. Jeg
                lærte mye om koreansk kultur og språk, og jeg fikk mange nye
                venner. Jeg savner Sør-Korea veldig mye, og jeg håper å kunne
                dra tilbake.
              </FormSummary.Value>
            </FormSummary.Answer>
          </FormSummary.Answers>
        </FormSummary.Value>
      </FormSummary.Answer>
    </FormSummary.Answers>
    <FormSummary.Footer>
      <FormSummary.EditLink href="#">
        <LinkIcon />
        Jeg vil endre dette svaret
      </FormSummary.EditLink>
    </FormSummary.Footer>
  </FormSummary>
);

export const NoLink: StoryFn<typeof FormSummary> = () => (
  <FormSummary>
    <FormSummary.Header>
      <FormSummary.Heading level="2">
        Arbeidsforhold som du har i eller utenfor EØS-området
      </FormSummary.Heading>
    </FormSummary.Header>

    <FormSummary.Answers>
      <FormSummary.Answer>
        <FormSummary.Label>Navn</FormSummary.Label>
        <FormSummary.Value>Ola Nordmann</FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Fødselsnummer</FormSummary.Label>
        <FormSummary.Value>12345678910</FormSummary.Value>
      </FormSummary.Answer>
    </FormSummary.Answers>
  </FormSummary>
);

const answers = [
  {
    label: "Fortell din livshistorie",
    value: `Det hele startet da jeg ble født en kald vinterdag i desember.
     Jeg var en litt spesiell baby, for jeg hadde masse hår på hodet. Mamma
     og pappa ble veldig overrasket da de så meg for første gang. De hadde egentlig
     forventet at jeg skulle være helt normal og kjedelig. Du vil kanskje ikke høre resten
     av historien min, for den er ganske lang og kjedelig...`,
  },
  {
    label: "Fødselsnummer",
    value: "12345678910",
  },
  {
    label: "Ting du har i sekken.",
    value: [
      {
        label: "Saks x2",
        value: `Jeg liker å ha med meg en saks i sekken min. Det er alltid kjekt å ha en saks. Jeg pakker gjerne med meg to saks. Da har jeg en reserve hvis den første saksen min skulle bli borte. Det er veldig kjekt.`,
      },
      {
        label: "Blyant",
        value:
          "Det er ikke mulig å skrive uten en blyant. Da blir det bare rot.",
      },
      {
        label: "Kake",
        value: `Jeg har alltid en kake i sekken min. Den blir litt most etter en
        stund i sekken min men det gjør ingenting. Jeg liker moste kaker. Det er veldig godt.`,
      },
      {
        label: "Kaffekopp",
        value: "Dette har jeg ikke i sekken min",
      },
    ],
  },
  {
    label: "Flere ting du har i sekken.",
    value: [
      {
        label: "Saks",
        value: `En saks til`,
      },
    ],
  },
];

export const RealisticUsage: StoryFn<typeof FormSummary> = () => (
  <FormSummary>
    <FormSummary.Header>
      <FormSummary.Heading level="2">
        Diverse informasjon om forskjellige ting og tang. Kjekt å vite.
      </FormSummary.Heading>
    </FormSummary.Header>

    <FormSummary.Answers>
      {answers.map((answer, index) => (
        <FormSummary.Answer key={index}>
          <FormSummary.Label>{answer.label}</FormSummary.Label>
          <FormSummary.Value>
            {Array.isArray(answer.value) ? (
              <FormSummary.Answers>
                {answer.value.map((subAnswer, subIndex) => (
                  <FormSummary.Answer key={subIndex}>
                    <FormSummary.Label>{subAnswer.label}</FormSummary.Label>
                    <FormSummary.Value>{subAnswer.value}</FormSummary.Value>
                  </FormSummary.Answer>
                ))}
              </FormSummary.Answers>
            ) : (
              answer.value
            )}
          </FormSummary.Value>
        </FormSummary.Answer>
      ))}
    </FormSummary.Answers>
    <FormSummary.Footer>
      <FormSummary.EditLink href="#" />
    </FormSummary.Footer>
  </FormSummary>
);

export const Empty: StoryFn<typeof FormSummary> = () => (
  <VStack gap="8">
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Just Header</FormSummary.Heading>
      </FormSummary.Header>
    </FormSummary>

    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Empty Answers</FormSummary.Heading>
        <FormSummary.EditLink href="#" />
      </FormSummary.Header>

      <FormSummary.Answers>{null}</FormSummary.Answers>
    </FormSummary>

    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Empty Answer</FormSummary.Heading>
        <FormSummary.EditLink href="#" />
      </FormSummary.Header>

      <FormSummary.Answers>
        <FormSummary.Answer>{null}</FormSummary.Answer>
      </FormSummary.Answers>
    </FormSummary>

    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Empty Label & Value</FormSummary.Heading>
        <FormSummary.EditLink href="#" />
      </FormSummary.Header>

      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>{null}</FormSummary.Label>
          <FormSummary.Value>{null}</FormSummary.Value>
        </FormSummary.Answer>
      </FormSummary.Answers>
    </FormSummary>

    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Empty Value</FormSummary.Heading>
        <FormSummary.EditLink href="#" />
      </FormSummary.Header>

      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>Adresse</FormSummary.Label>
          <FormSummary.Value>{null}</FormSummary.Value>
        </FormSummary.Answer>
      </FormSummary.Answers>
      <FormSummary.Footer>
        <FormSummary.EditLink href="#" />
      </FormSummary.Footer>
    </FormSummary>
  </VStack>
);

export const CommaSeparated: StoryFn<typeof FormSummary> = () => (
  <FormSummary>
    <FormSummary.Header>
      <FormSummary.Heading level="2">Personalia</FormSummary.Heading>
    </FormSummary.Header>

    <FormSummary.Answers>
      <FormSummary.Answer>
        <FormSummary.Label>
          Hvilket transportmiddel er du mest kjent for?
        </FormSummary.Label>
        <FormSummary.Value>
          sykkel, tog, bil, buss, sparkesykkel
        </FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Favoritt slagord?</FormSummary.Label>
        <FormSummary.Value>{`I'll be back.`}</FormSummary.Value>
        <FormSummary.Value>Hasta la vista, baby.</FormSummary.Value>
        <FormSummary.Value>Say hello to my little friend.</FormSummary.Value>
      </FormSummary.Answer>
    </FormSummary.Answers>
    <FormSummary.Footer>
      <FormSummary.EditLink href="#" />
    </FormSummary.Footer>
  </FormSummary>
);

export const ColorRole: StoryFn<typeof FormSummary> = () => (
  <FormSummary>
    <FormSummary.Header>
      <FormSummary.Heading level="2">
        Diverse informasjon om forskjellige ting og tang. Kjekt å vite.
      </FormSummary.Heading>
    </FormSummary.Header>

    <FormSummary.Answers>
      {answers.map((answer, index) => (
        <FormSummary.Answer key={index}>
          <FormSummary.Label>{answer.label}</FormSummary.Label>
          <FormSummary.Value>
            {Array.isArray(answer.value) ? (
              <FormSummary.Answers data-color="warning">
                {answer.value.map((subAnswer, subIndex) => (
                  <FormSummary.Answer key={subIndex}>
                    <FormSummary.Label>{subAnswer.label}</FormSummary.Label>
                    <FormSummary.Value>{subAnswer.value}</FormSummary.Value>
                  </FormSummary.Answer>
                ))}
              </FormSummary.Answers>
            ) : (
              answer.value
            )}
          </FormSummary.Value>
        </FormSummary.Answer>
      ))}
    </FormSummary.Answers>
    <FormSummary.Footer>
      <FormSummary.EditLink href="#" />
    </FormSummary.Footer>
  </FormSummary>
);

export const Chromatic: StoryObj<typeof FormSummary> = {
  render: () => (
    <div>
      <div>
        <h2>Default</h2>
        <Default>{null}</Default>
      </div>
      <div>
        <h2>Long Texts</h2>
        <LongTexts>{null}</LongTexts>
      </div>
      <div>
        <h2>No Link</h2>
        <NoLink>{null}</NoLink>
      </div>
      <div>
        <h2>Realistic Usage</h2>
        <RealisticUsage>{null}</RealisticUsage>
      </div>
      <div>
        <h2>Empty</h2>
        <Empty>{null}</Empty>
      </div>
      <div>
        <h2>Comma Separated</h2>
        <CommaSeparated>{null}</CommaSeparated>
      </div>
      <div>
        <h2>ColorRole</h2>
        <ColorRole>{null}</ColorRole>
      </div>
    </div>
  ),
  parameters: {
    chromatic: {
      disable: false,
      modes: {
        default: {
          viewport: {
            width: 620,
          },
        },
        sm: {
          viewport: {
            width: 479,
          },
        },
      },
    },
  },
};

export const _DevWarning_MisuseInHeaderExample: StoryFn<
  typeof FormSummary
> = () => (
  <FormSummary>
    <FormSummary.Header>
      <FormSummary.Heading level="2">Personalia</FormSummary.Heading>
      {/* Intentional to trigger warning */}
      <FormSummary.EditLink href="#" />
    </FormSummary.Header>
    <FormSummary.Answers>
      <FormSummary.Answer>
        <FormSummary.Label>Navn</FormSummary.Label>
        <FormSummary.Value>Ola Nordmann</FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Fødselsnummer</FormSummary.Label>
        <FormSummary.Value>12345678910</FormSummary.Value>
      </FormSummary.Answer>

      <FormSummary.Answer>
        <FormSummary.Label>Barn nr. 1</FormSummary.Label>
        <FormSummary.Value>
          <FormSummary.Answers>
            <FormSummary.Answer>
              <FormSummary.Label>Navn</FormSummary.Label>
              <FormSummary.Value>Kari Nordmann</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
              <FormSummary.Label>Kjønn</FormSummary.Label>
              <FormSummary.Value>Jente</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
              <FormSummary.Label>Alder</FormSummary.Label>
              <FormSummary.Value>6</FormSummary.Value>
            </FormSummary.Answer>
          </FormSummary.Answers>
        </FormSummary.Value>
      </FormSummary.Answer>
    </FormSummary.Answers>
    <FormSummary.Footer>
      <FormSummary.EditLink href="#" />
    </FormSummary.Footer>
  </FormSummary>
);

_DevWarning_MisuseInHeaderExample.parameters = {
  docs: { disable: true },
  chromatic: { disableSnapshot: true },
};
