## Validering

Selv om FnrInput bare består av ett skjemafelt, er det ønskelig at man følger noen av rettningslinjene for [Skjemavalidering](/patterns/form-validation).

- Validering av felt skal ikke skje før etter første submit-forsøk, deretter `onChange`.
- Feil skal forsvinne etterhvert som den blir utbedret.
- Etter at en feil er blitt utbredet, må det et nytt `submit`-forsøk til for at ny feilmelding skal vises.

## Lenge på inputfelt

Som nevnt på [komponent-siden for Input](/components/input#lengde) så bør inputfeltenes lengde tilpasses det antallet tegn som brukeren skal fylle inn. For fødselsnummer på 11 siffer anbefaler vi å bruke `bredde="S"`.

## Unngå placeholders

Vi fraråder bruken av `placeholder`-attributtet på input-elementer. [Mer info på tilgjengelighets-siden for placeholders.](/accessibility/placeholders)
