# Guideline-siden - utviklerdokumentasjon

Komponenter-menyvalget på Guideline-siden lister opp alle modulene som er implementert i nav-frontend. Logikken for
oppbygningen av alle Komponenter-undersidene er like, og alt det ligger i `guideline-app`-delen av 
prosjektet, men alt av innhold på sidene kommer fra kodebasen til hver enkelt komponent.

Som utvikler skal man ikke måtte forholde seg så mye til hva som skal stå i tekstene på sidene - det er noe designerne
i Designsystem-teamet selv skal holde vedlike gjennom redigering av `.md`-filene som ligger under `md/`-folderen i hver
modul. 

Det som er viktig at utviklerne selv tar ansvar for er at live-demoer av komponenter, og kodeeksemplene under
Utviklerdokumentasjon, fungerer som det skal til enhver tid.


## Kort om live-demo, kodeeksempler og menypunkter
De fleste av React-modulene i nav-frontend har nå sin egen fil på formatet `_<komponentnavn>.sample.js` som ligger i 
rotmappa for den gjeldende modulen. 

Hver og en av de filene sørger for at:  
* Det blir laget et eget menypunkt for denne komponenten under *Komponenter*-menyen på Guideline-siden.
* Det blir opprettet en route på `/components/<komponentnavn>`, med tilhørende komponent for å holde på dokumentasjon
for denne komponenten.
* Alt rundt live-demo av komponenten, inkludert rendering, toggling av checkbokser, radioknapper og live-kodeeksempler,
fungerer som det skal (basert på det som blir default-eksportert ut fra `_<komponentnavn>.sample.js`).
 

## Vedlikehold av live-demoer og kodeeksempler
Alle live-demoene og kodeeksemplene fungerer utifra det som blir default-eksportert ut fra den gjeldende 
`_<komponentnavn>.sample.js`-fila som ligger i rotmappa for modulene.

Til vedlikehold av live-demoer og kodeeksempler er det lagd et API som abstraherer vekk mye av kompleksiteten som 
ligger bak for at man skal slippe å dykke langt ned i kodebasen om man kun er opptatt av å bidra med utvikling av 
eksisterende eller nye komponenter til kodebiblioteket.


## API-et
API-et består av en funksjon som blir default-eksportert ut fra 
[denne modulen](https://github.com/erlendev/nav-frontend-moduler/blob/master/guideline-app/app/utils/sampling/sampleDataGenerator.js).

Denne funksjonen tar et objekt med attributtene som er beskrevet i tabellen under. Det objektet som blir angitt  
blir merget sammen med defaultverdiene og overrider kun der det er eksplisitt sagt hva verdien skal være. 

| Attributtnavn | Type            | Required | Default          |
| ------------- | --------------  |:--------:| ---------------- | 
| baseType      | function        | true     | undefined        |
| modifierNames | array (string)  | false    | []               |
| attrs         | object          | false    | {}               |
| children      | node            | false    | null             |
| subType       | function        | false    | null             |
| tabOptions    | object          | false    | { ... se under } |


### baseType
React-komponenten som komponent-siden lager live-demoen utifra (basert på `__docgenInfo`/`prop-types`).
Om det er flere varianter av typen, må de angis i `type`-propTypen på komponenten.

Eksempel:
```js
Alertstripe.propTypes = {
    type: PropTypes.oneOfType('suksess', 'info', 'advarsel')
}
```

Dette resulterer i en radiogruppe med en radioknapp per type.
Live-demo og kodeeksempel oppdateres av seg selv for denne komponenten når radioknappene brukes.

**OBS!** Dersom `type`-propTypen ikke fins, vil propTypen `bredde`, av hensyn til `<input type="" />`, 
bli forsøkt benyttet istedet. Om komponenten ikke har noen forskjellige typer vil ingen radioknapper bli renderet.

**OBS!!** For at det skal være mulig å hente ut __docgenInfo for komponenten må den bli default-eksportert ut av modulen. 


### modifierNames
Eventuelle navn på bool-propTyper på komponenten som skal kunne toggles av og på, uavhengig av typen. 
Resulterer i en gruppe checkbokser som kan toggles av og på. 
Live-demo og kodeeksempel oppdateres av seg selv når checkboksene brukes.

Eksempel:
```js
export default generateSample({
    baseType: KnappBase,
    modifierNames: ['mini', 'spinner', 'disabled'],
    children: 'Slik ser en Knapp ut'
});
```

### attrs
Et objekt med (key,value)-par som til enhver tid skal brukes som attributter på komponenten som vises.

Eksempel:
```js
export default generateSample({
    baseType: Input,
    modifierNames: ['disabled', 'feil'],
    attrs: { label: 'Inputfelt-label' }
});
```

### children
Må være en gyldig ReactNode. Brukes som children til enhver tid på komponenten som vises.

Eksempel 1:
```js
export default generateSample({
    baseType: Lenkepanel,
    attrs: { href: '/# ' },
    children: 'Slik ser et lenkepanel ut'
});
```

Eksempel 2:
```js
const children = [1, 2, 3].map((value) => (
    <ToggleKnapp value={`knapp${value}`} key={value} defaultChecked={value === 1}>
        Knapp {value}
    </ToggleKnapp>
    )
);

export default generateSample({
    baseType: ToggleGruppe,
    attrs: {
        onChange: () => {}, name: 'toggleGruppe'
    },
    children
});
```

### subType
En React-komponent som renderes istedetfor `baseType`, som trengs dersom man f.eks. trenger å ta
utgangspunkt i propTypene til en `baseType`, men ønsker å rendere `subType` som live-demoen. 

`Textarea` vs. `TextareaControlled` er et eksempel på dette:
```js
export default generateSample({
    baseType: Textarea,
    subType: TextareaControlled,
    modifierNames: ['feil', 'disabled'],
    attrs: { label: 'Textarea-label', maxLength: 20 }
});
```


### tabOptions
Konfigurasjon av tabbene som vises for kodeeksemplet under Utviklerdokumentasjon.

Det meste her skal være selvforklarende. Merk at `js`-objektet tar inn en string som er koden som skal vises. 
Denne koden vil ikke endre seg med radio- eller checkbox-toggling i UI-et. 
Eksempel på bruk av `js` ligger i `nav-frontend-modal/_modal.sample.js`. 

Default-verdi:
```js
tabOptions: {
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

I tilfelle man ønsker å hente en .js-fil som ren tekst uten at den blir transpilert, som er gjort for 
Modal-kodeeksemplet, er det satt opp ekskludering av filer som slutter på `.no-transpilation.js` på loaderen i 
[Webpack-configen](https://github.com/erlendev/nav-frontend-moduler/blob/master/guideline-app/conf/_webpack.global.js).