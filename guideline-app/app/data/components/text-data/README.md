## Om endring av tekstdata

Dette området er tiltenkt**designere**(foreløpig kun de som er en del av designsystem-teamet)
som skal ha rettigheter til å opprette nye eller redigere eksisterende designretningslinjer 
på enkeltkomponent-nivå. 

Informasjonen man kan si noe om er for eksempel:
- Generell informasjon om en komponent
- Designretningslinjer, for eksempel:
    - Hvordan de forskjellige variantene av hver enkelt UI-komponent skal benyttes
    - Hvordan en gitt UI-komponent skal benyttes i kombinasjon med andre
- Krav og retningslinjer til universell utforming 

Alle endringer som blir gjort i filene i disse undermappene, vil sørge for at neste versjon som
legges ut av [Guidelines-siden](https://erlendev.github.com/nav-frontend-moduler) får med seg de
oppdateringene som har blitt lagt inn.


### Filstandard

På [Guidelines-siden](https://erlendev.github.com/nav-frontend-moduler) har hver enkelt komponent
(under menyvalget "Komponenter"), fått en egen artikkel, som består av:
1. En ingress som sier noe overordnet og generelt om komponenten
2. En generell tekst som sier noe generelt om komponenten, evt. supplerer noe informasjon til live-eksemplet
3. En tekst som beskriver hvordan komponenten er tenkt å tas i bruk
4. En tekst som beskriver retningslinjer og krav til universell utforming ved bruk av komponenten

Alle disse tekstene er mulig å endre på for hver enkelt komponent, og hver av disse tekstene
har sin egen .md-fil (en slags tekstfil) i mappen for den komponenten det gjelder. Alle 
filene er navngitt på formatet _KomponentNavn.ingress/general/usage/accessibility.md_. 

Eksempel-filnavn for Alertstripe-komponenten:
1. Alertstripe.ingress.md
2. Alertstripe.general.md
3. Alertstripe.usage.md
4. Alertstripe.accessibility.md


### Hvordan endre på en fil

1. Trykk deg inn på mappen til den komponenten du ønsker å endre på innholdet til.
2. Velg riktig .md-fil i forhold til hvilket innhold i artikkelen du ønsker å endre på.
3. Trykk på blyanten i menyen rett over teksten for å begynne å redigere.
4. Gjør endringene i .md-filen, trykk evt. på "Preview changes" for å sjekk at det blir riktig.
5. Scroll ned til bunnen av siden, legg inn teksten "Text changes" i beskrivelsesfeltet, 
og trykk "Commit changes".

**OBS!** For at du skal kunne endre på filer må opprette en bruker på GitHub, være logget inn, og ha fått tilgang av en administrator
av koderepository-et. [@erlendev](https://github.com/erlendev/) kan kontaktes for å få hjelp til dette.

### Redigering av .md-filer

.MD er en forkortelse for [Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet),
som er en type tekstfil som vil bli forstått av Guidelines-siden som HTML uten at man selv må skrive HTML-tags.

Dette gjøres automatisk ved at man benytter seg av reglene som står beskrevet i 
[Markdown sitt cheat-sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet),
men i Guidelines-løsningen er det**kun**mulig å bruke reglene for å lage 
[lenker](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links). Dette er fordi
vi ønsker at informasjonshierarkiet og utformingen av alle artikkel-sidene for alle komponentene skal
være like. 

Så den eneste regelen man trenger å forholde seg til med tanke på å lage .md-filer forskjellig
fra vanlige tekstfiler, er at man må følge 
instruksjonene [her](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#links) dersom 
man ønsker å lage en link.


Vanlig tekst, linjeskift og nye avsnitt er fullt mulig og angis på helt vanlig måte som i en normal tekstfil.