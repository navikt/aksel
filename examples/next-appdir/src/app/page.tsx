import Image from "next/image";
import { PrinterLargeIcon, StarIcon } from "@navikt/aksel-icons";
import * as Accordion from "@navikt/ds-react/Accordion";
import { Button } from "@navikt/ds-react/Button";
import { Checkbox, CheckboxGroup } from "@navikt/ds-react/Checkbox";
import { UNSAFE_Combobox } from "@navikt/ds-react/Combobox";
import {
  ExpansionCard,
  ExpansionCardContent,
  ExpansionCardHeader,
  ExpansionCardTitle,
} from "@navikt/ds-react/ExpansionCard";
import { Select } from "@navikt/ds-react/Select";
import { Tooltip } from "@navikt/ds-react/Tooltip";
import { omit } from "@navikt/ds-react/Utils";
import { ClientComponent, MyDatePicker } from "./client";
import styles from "./page.module.css";

export default function Home() {
  const initialOptions = [
    "A New Hope",
    "The Empire Strikes Back",
    "Return of the Jedi",
    "The Phantom Menace",
    "Attack of the Clones",
    "Revenge of the Sith",
    "The Force Awakens",
    "Rogue One",
    "The Last Jedi",
    "Solo",
    "The Rise of Skywalker",
  ];

  console.info({ omit: omit({ test: "value" }, ["test"]) });

  return (
    <main className={styles.main}>
      <ClientComponent />
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <Tooltip content="Skriv ut dokument">
        <Button icon={<PrinterLargeIcon title="demo knapp" />} />
      </Tooltip>
      <Select label="Hvilket land har du bosted i?">
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>
      <StarIcon />
      <Button>Knapp</Button>
      <ExpansionCard aria-label="Demo med bare tittel">
        <ExpansionCardHeader>
          <ExpansionCardTitle>Utbetaling av sykepenger</ExpansionCardTitle>
        </ExpansionCardHeader>
        <ExpansionCardContent>abc</ExpansionCardContent>
      </ExpansionCard>
      <Accordion.Accordion>
        <Accordion.AccordionItem>
          <Accordion.AccordionHeader>
            Til deg som er mellom 62 og 67 år
          </Accordion.AccordionHeader>
          <Accordion.AccordionContent>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre <a href="#Unntak">unntak</a>.
          </Accordion.AccordionContent>
        </Accordion.AccordionItem>
        <Accordion.AccordionItem>
          <Accordion.AccordionHeader>
            Til deg som har yrkesskade eller yrkessykdom
          </Accordion.AccordionHeader>
          <Accordion.AccordionContent>
            Med yrkesskade mener vi at du har fått en skade som følge av en
            arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
            kommer av skadelig påvirkning fra arbeidsmiljøet.
          </Accordion.AccordionContent>
        </Accordion.AccordionItem>
        <Accordion.AccordionItem>
          <Accordion.AccordionHeader>
            Til deg som er helt frisk
          </Accordion.AccordionHeader>
          <Accordion.AccordionContent>
            Da er det lite som trengs å gjøres.
          </Accordion.AccordionContent>
        </Accordion.AccordionItem>
      </Accordion.Accordion>
      <UNSAFE_Combobox
        label="Hva er den aller kuleste Star Wars-filmen noensinne, helt objektivt?"
        options={initialOptions}
        shouldAutocomplete={true}
      />
      <CheckboxGroup legend="Hvor vil du sitte?">
        <Checkbox value="Bakerst">Bakerst</Checkbox>
        <Checkbox value="Midterst">Midterst</Checkbox>
        <Checkbox value="Fremst">Fremst</Checkbox>
      </CheckboxGroup>

      <MyDatePicker />

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
