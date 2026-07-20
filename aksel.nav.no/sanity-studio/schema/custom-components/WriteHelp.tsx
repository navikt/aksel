import { BodyLong, Heading, List } from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";

const WriteHelp = () => {
  return (
    <div>
      <Heading level="2" size="medium" spacing>
        Skriveråd
      </Heading>
      <BodyLong spacing>
        Språkstilen vi bruker på Aksel skal være enkel, vennlig og tilgjengelig:
      </BodyLong>
      <List>
        <ListItem>
          Bruk et aktivt språk og personlige pronomen som «du» og «vi»
        </ListItem>
        <ListItem>
          Bruk gjerne et hverdagslig språk og unngå komplisert fagterminologi
        </ListItem>
        <ListItem>Sett de viktigste nøkkelordene langt frem i teksten</ListItem>
        <ListItem>Skriv hele, korte setninger</ListItem>
        <ListItem>
          Skriv gode og meningsbærende overskrifter og mellomtitler
        </ListItem>
        <ListItem>
          Skap kontraster i teksten med for eksempel punktlister, tipsbokser og
          accordions
        </ListItem>
        <ListItem>
          Skriv til en kollega som kan mindre om stoffet enn deg selv
        </ListItem>
        <ListItem>
          Bruk eksempler for å forklare slik at budskapet ditt blir enklere å
          forstå
        </ListItem>
        <ListItem>
          Få en kollega eller to til å lese teksten før publisering for å sjekke
          om teksten er forståelig og svarer på brukeroppgavene.
        </ListItem>
        <ListItem>
          Gi lesereren relevante veier videre. Når du lenker til andre sider, må
          du skrive en lenketekst som er beskrivende for lenkens mål.
        </ListItem>
        <ListItem>
          Hvis du bruker bilder, må du legge inn alt-tekst som fungerer som et
          reelt alternativ for bildet.
        </ListItem>
        <ListItem>
          {`Sørg for at overskriftsnivåene er i sammenhengende rekkefølge (H2 > H3 er OK, H2 > H4 er ikke OK).`}
        </ListItem>
      </List>
    </div>
  );
};

export { WriteHelp };
