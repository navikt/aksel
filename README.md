# NAV-frontend-moduler
Dette er et monorepo for alle NAVs felleskomponenter/fellesmoduler, samt implementasjonen av en webapp som sitter på 
dokumentasjon om bruken og implementasjonen av disse. 

Alle komponentene i nav-frontend publiseres som npm-pakker på npmjs.com. 
En fullstendig liste over disse ligger [her](https://www.npmjs.com/org/navikt).
Hver enkelt pakke har sine egne installasjonsinstruksjoner som også ligger publisert der.

Kildekoden til Guideline-appen (som ligger publisert [her](https://navikt.github.io/nav-frontend-moduler)) ligger adskilt
fra komponentene, og er lagt under ```guideline-app/``` på rot av prosjektet. Guideline-appen er i relativt stor grad
avhengig av komponentene som ligger under ```packages/node_modules```, men denne avhengigheten går bare en vei (dvs.
at komponentene er ikke på noen som helst måte avhengig av appen).

Guideline-appen har sine egen README-filer som ligger her:
* [Egen README spisset mot designere](https://github.com/navikt/nav-frontend-moduler/blob/master/guideline-app/README.design.md)
* [Egen README spisset mot utviklere](https://github.com/navikt/nav-frontend-moduler/blob/master/guideline-app/README.developer.md)

For å komme igang med å bruke komponentene, benytt deg av [Guideline-appen](https://navikt.github.io/nav-frontend-moduler)
for dokumentasjon, [npmjs](https://www.npmjs.com/org/navikt) for npm-pakker, og ta en titt på de forskjellige 
eksemplene under ```examples/``` for å se forskjellige eksempler på oppsett.

## Bidra med utvikling av nye og eksisterende komponenter

Se [egne retningslinjer](https://github.com/navikt/nav-frontend-moduler/blob/master/CONTRIBUTING.md).

## Licenses and attribution

_For updated information, always see LICENSE first!_

### Font License

The Source Sans Pro font files in `packages/node_modules/nav-frontend-typografi-style/assets` are a subset of
[Source Sans Pro](https://github.com/adobe-fonts/source-sans-pro), licensed under the [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?item_id=OFL), and copyright [Adobe Systems Incorporated](http://www.adobe.com/).

### Icon License

This project uses [Streamline Icons](http://www.streamlineicons.com/). If you use nav-frontend-moduler in your project please adhere to the [Streamline Icons license agreement](http://www.streamlineicons.com/license.html).

### The rest of the codebase (excluding 3rd party dependencies)

Copyright (c) 2017 NAV

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
