import { createFileRoute } from "@tanstack/react-router";
import {
  BodyLong,
  Button,
  HStack,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  VStack,
} from "@navikt/ds-react";
import DatePickerWrapper from "../components/aktivitetsplan/modal/DatePickerWrapper";

export const Route = createFileRoute("/aktivitetsplan/ny")({
  component: ActivityModal,
});

function ActivityModal() {
  const navigate = Route.useNavigate();

  return (
    <Modal
      open
      header={{ heading: "Legg til ny aktivitet" }}
      onClose={() => navigate({ to: "/aktivitetsplan/" })}
      closeOnBackdropClick={true}
      placement="top"
      size="medium"
      width="medium"
    >
      <Modal.Body>
        <VStack
          as="form"
          onSubmit={() => navigate({ to: "/aktivitetsplan/" })}
          gap="6"
        >
          <BodyLong>
            Her kan du informere om der du jobber nå, for eksempel en
            deltidsjobb eller en midlertidig stilling. Hvis du sender inn
            meldekort, så må du også huske å føre opp de timene du har jobbet på
            meldekortet.
          </BodyLong>
          <TextField label="Stillingstittel" />
          <HStack gap="4">
            <DatePickerWrapper label="Fra dato" />
            <DatePickerWrapper label="Til dato (valgfri)" />
          </HStack>
          <RadioGroup legend="Stillingsandel">
            <Radio value="heltid">Heltid</Radio>
            <Radio value="deltid">Deltid</Radio>
          </RadioGroup>
          <TextField label="Arbeidsgiver" />
          <TextField
            label="Ansettelsesforhold"
            description="For eksempel fast, midlertidig, vikariat"
          />
          <TextField
            label="Kort beskrivelse av stillingen"
            description="For eksempel dag, kveld, helg, stillingsprosent eller oppgaver"
            maxLength={5000}
          />
          <HStack gap="4">
            <Button type="submit">Lagre</Button>
          </HStack>
        </VStack>
      </Modal.Body>
    </Modal>
  );
}
