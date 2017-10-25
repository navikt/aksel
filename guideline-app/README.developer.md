## Denne README'n er in-progress

### Guideline-siden - utviklerdokumentasjon

Komponenter-menyvalget på Guideline-siden lister opp alle modulene som er implementert i nav-frontend. Logikken for
oppbygningen av alle Komponenter-undersidene er like, og alt det ligger i `./guideline-app`-delen av 
prosjektet, men alt av innhold på sidene kommer fra kodebasen til hver enkelt komponent. 

Som utvikler skal man ikke måtte forholde seg så mye til hva som skal stå i tekstene på sidene - det er noe designerne
i Designsystem-teamet selv skal holde vedlike gjennom redigering av `.md`-filene som ligger under `md/`-folderen i hver
modul. 

**Det som er viktig at utviklerne selv tar ansvar for er at live-demoer av komponenter, og kodeeksemplene under
Utviklerdokumentasjon, fungerer som det skal til enhver tid.** 


#### Vedlikehold av live-demoer og kodeeksempler
Alt rundt live-demo av komponentene, inkludert rendering, toggling av checkbokser, radioknapper og live-kodeeksempler,
fungerer av seg selv utifra det som blir default-eksportert ut fra `_<komponentnavn>.sample.js`, som ligger i hver
enkelt modul-folder (f.eks. `nav-frontend-knapper/_knapp.sample.js`). 

Til dette er det laget et API som abstraherer vekk mye av kompleksiteten som ligger bak for at man skal slippe å dykke
langt ned i kodebasen om man kun er opptatt av å bidra med utvikling av eksisterende eller nye komponenter til 
kodebiblioteket.


#### API-et
API-et består av en funksjon som blir default-eksportert ut fra 
[denne modulen](https://github.com/erlendev/nav-frontend-moduler/blob/master/guideline-app/app/utils/sampling/sampleDataGenerator.js).

| Parameter     | Type           | Required | Default          |
| ------------- | -------------- |:--------:| ---------        | 
| baseType      | function       | true     | undefined        |
| modifierNames | array (string) | false    | []               |
| attrs         | object         | false    | undefined        |
| children      | node/fn        | false    | undefined        |
| subType       | function       | false    | undefined        |
| tabOptions    | object         | false    | { ... se under } |


##### baseType
React-komponenten som komponent-siden lager live-demoen utifra (basert på `__docgenInfo`/`prop-types`).
Om det er flere varianter av typen, må de angis i `type`-propTypen på komponenten, f.eks.:

```
Alertstripe.propTypes = {
    type: PropTypes.oneOfType('suksess', 'info', 'advarsel')
}
```

Dette resulterer i en radiogruppe med en radioknapp per type.
Live-demo og kodeeksempel oppdateres av seg selv for denne komponenten når radioknappene brukes.

**OBS!** Dersom `type`-propTypen ikke fins, vil propTypen `bredde`, av hensyn til `<input type="" />`, 
bli forsøkt benyttet istedet. Om komponenten ikke har noen forskjellige typer vil ingen radioknapper bli renderet.*

**OBS!!** For at det skal være mulig å hente ut __docgenInfo for komponenten må den bli default-eksportert ut av modulen. 


##### modifierNames
Eventuelle navn på **bool**-propTyper på komponenten som skal kunne toggles av og på, uavhengig av type. 
Resulterer i en gruppe checkbokser som kan toggles av og på. 
Live-demo og kodeeksempel oppdateres av seg selv når checkboksene brukes.

##### attrs
Et objekt med (key,value)-par som til enhver tid skal brukes som attributter på komponenten som vises.

##### children
Kan være en React-renderfunksjon eller en vanlig string. Brukes som children til enhver tid på komponenten som vises.

##### subType
En React-komponent som renderes istedetfor `baseType`, som trengs dersom man f.eks. trenger å ta
utgangspunkt i propTypene til en `baseType`, men ønsker å rendere `subType` som live-demoen. 
`Textarea` vs. `TextareaControlled` er et eksempel på dette.

##### tabOptions
Konfigurasjon av tabbene som vises for kodeeksemplet under Utviklerdokumentasjon.

Det meste her skal være selvforklarende. Merk at `js`-objektet tar inn en string som er koden som skal vises. 
Denne koden vil ikke endre seg med radio- eller checkbox-toggling i UI-et. 
Eksempel på bruk av `js` ligger i `nav-frontend-modal/_modal.sample.js`. 

Default-verdi:
```
{
    react: {
        show: true,
        label: 'React'
    },
    html: {
        show: true,
        defaultActive: true,
        label: 'HTML'
    },
    css: {
        show: true,
        label: 'CSS'
    },
    js: {
        show: false,
        label: 'JavaScript',
        code: ''
    }
}
```