import React from 'react';
import ImageTextAside from './../../components/image-text-aside/ImageTextAside';

function OurValuesPage() {
    return (
        <div className="ourValuesPage">
            <ImageTextAside
                title="Til stede – fordi det har en tilgjengelighetsdimensjon."
                text="
                    Vi skal være til stede gjennom flere kanaler, gjennom NAV-kontor, på telefon og på internett.
                    Tilstedeværelse har også en innlevelsesdimensjon. For å være til stede må man feste blikket,
                    være fokusert, høre hva folk sier, forstå hva de mener, bidra. Det har også en dimensjon som
                    handler om å være engasjert/samfunnsengasjert. Den som er til stede, vet hva som foregår,
                    involverer seg og bryr seg, følger med og tar tak. Gjennom tilstedeværelse viser vi også brukeren
                    respekt!
                "
            />

            <ImageTextAside
                title="Tydelig – fordi tydelighet er helt avgjørende i alt vi gjør."
                text="
                    Det skal være tydelig hva vi har ansvaret for, hva vi ikke har ansvaret for og hva som er den
                    enkeltes plikter og rettigheter. Det skal være tydelig hva vi kan bidra med og hva vi krever
                    tilbake, både av brukere og partnere. Det skal være tydelig hvor vi er, hva vi vil og hva vi kan.
                    Vi skal tydelig formidle at vi er her for å hjelpe enkeltmennesker, i samspill med dem."
            />

            <ImageTextAside
                title="
                    Løsningsdyktig – fordi det setter fokus på løsning og samtidig
                    ivaretar det kvalitative gjennom dyktighet.
                "
                text="
                    Vi skal være flinke til å finne løsninger sammen med brukeren, hos brukeren og i vårt eget
                    apparat. Løsningsdyktighet krever samarbeid med en rekke instanser; i kommunene, helsevesenet,
                    utdanningssektoren, næringslivet med videre. Vi må også ha kreativitet og handlekraft nok til å
                    gjennomføre de tiltak som er riktige, mulige og nødvendige.
                "
            />
        </div>
    );
}

export default OurValuesPage;
