#### Lengden på inputfelter
Lengden på inputfelt skal tilpasses det antallet tegn bruker skal fylle inn. For å holde skjemaene ryddige og oversiktlige, samt for å lette utviklingen er det satt et sett med faste bredder. Velg den bredden som passer best til dataene bruker skal fylle inn.

#### Obligatoriske og valgfrie felter
Vi skal bare spørre etter informasjon som vi må ha, altså påkrevd eller obligatorisk informasjon. Dersom det er absolutt nødvendig kan vi legge til valgfrie felter. Dette medfører at de fleste felter i skjemaene våre er obligatoriske. Vi har valgt å ikke markere dem som det grunnet mye gjentakelse. Når vi unntaksvis har et og annet valgfritt felt, så skal "(valgfri)" legges til i ledeteksten, f.eks. "Alder (valgfri)".

#### E-post
Bruk alltid input med type="email" for epostfelt. Da får brukeren opp tastatur med @ på mobil.

#### Dato
Det må legges til formatering som gjør at brukere på mobil får opp native-datovelger når denne er nyttig å bruke. Unntak da dette ikke er nyttig er når man skal oppgi fødselsdato og liknende der man ikke har nytte av å se kaleanderen.

#### Telefon
Bruk alltid input med type="tel" for felt for telefonnummer. Da får brukeren opp tastatur på mobil.

#### Tegnteller
For tekstområder der bruker kan legge til et begrenset antall tegn, skal tegntelleren brukes.

#### Textsarea
Textarea brukes for fritekst som kan gå over flere linjer. Antall tillatte tegn bestemmes av feltets maxLength attributt. Dette forhindrer også at man får skrevet flere tegn enn maxLength.

