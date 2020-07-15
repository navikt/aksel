import lessToJs from 'less-vars-to-js';
import vars from '!raw-loader!NavFrontendCore/less/_variabler.less'; // eslint-disable-line import/no-webpack-loader-syntax, max-len, import/no-unresolved

const lessvars = lessToJs(vars);

const colors = {
    navRod: {
        hex: lessvars['@navRod'],
        label: 'NAV Rød',
        description: 'NAV Rød er hovedprofilfarge. Brukes i logoen og enkelte elementer som bærer identiteten til NAV.'
    },
    navMorkGra: {
        hex: lessvars['@navMorkGra'],
        label: 'NAV Mørk grå',
        description: `
            NAV Mørk grå er vår tekstfarge og en variasjon av grå som ikke oppfattes så skarp på en 
            lys bakgrunn. Hvit eller NAV Lys grå, er mer behagelig å se på og øker lesbarheten
        `,
        contrastColors: {
            hvit: { hex: '#fff', label: 'mørk grå / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], label: 'mørk grå / lys grå' },
            orangeFocus: { hex: lessvars['@orangeFocus'], label: 'mørk grå / fokus oransje' },
            navGra20: { hex: lessvars['@navGra20'], label: 'mørk grå / grå 20' },
            navGra40: { hex: lessvars['@navGra40'], label: 'mørk grå / grå 40' }
        }
    },
    navLysGra: {
        hex: lessvars['@navLysGra'],
        label: 'NAV Lys grå',
        description: 'Bakgrunn skal hovedsakelig være lys og luftig, med mye bruk av hvit og NAV lys grå.',
        textColor: lessvars['@navMorkGra']
    },
    navGra80: {
        hex: lessvars['@navGra80'],
        label: 'NAV Grå +80',
        description: '',
        contrastColors: {
            hvit: { hex: '#fff', label: 'grå 80 / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], label: 'grå 80 / lys grå' }
        }
    },
    navGra60: {
        hex: lessvars['@navGra60'],
        label: 'NAV Grå +60',
        description: '',
        contrastColors: {
            hvit: { hex: '#fff', label: 'grå 60 / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], label: 'grå 60 / lys grå' }
        }
    },
    navBla: {
        hex: lessvars['@navBla'],
        label: 'NAV Blå',
        description: 'NAV Blå skal indikere mulighet for interaksjon med et visuelt element. Eks. '
        + 'Lenker, knapper, ikoner.',
        contrastColors: {
            hvit: { hex: '#fff', label: 'blå / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], label: 'blå / lys grå' }
        }
    },
    navDypBla: {
        hex: lessvars['@navDypBla'],
        label: 'NAV Dyp Blå',
        description: 'NAV Dyp Blå benyttes som støtte farge til NAV blå for å indikere forandring i status. '
        + 'Fra interaksjon til aktivt',
        contrastColors: {
            hvit: { hex: '#fff', label: 'dyp blå / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], label: 'dyp blå / lys grå' },
            orangeFocus: { hex: lessvars['@orangeFocus'], label: 'dyp blå / fokus oransje' }
        }
    },
    navLilla: {
        hex: lessvars['@navLilla'],
        label: 'NAV Lilla',
        description: 'NAV Lilla benyttes som støtte farge til NAV dyp blå for å indikere en tredje status '
        + 'forskjell. Fra aktivt til “besøkt”',
        contrastColors: {
            hvit: { hex: '#fff', label: 'lilla / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], label: 'lilla / lys grå' },
            orangeFocus: { hex: lessvars['@orangeFocus'], label: 'lilla / fokus oransje' }
        }
    },
    navLilla60: {
        hex: '#C1B5D0',
        label: 'NAV Lilla -60',
        description: '',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], label: 'lilla -60 / mørk grå' }
        }
    },
    redError: {
        hex: lessvars['@redError'],
        label: 'NAV Murstein Rød',
        description: 'NAV Murstein Rød indikerer feil eller mangel av informasjon. Kan også indikere at en handling '
        + 'fra bruker kan medføre tap av data eller avbryte en pågående prosess.',
        contrastColors: {
            hvit: { hex: '#fff', label: 'murstein rød / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], label: 'murstein rød / lys grå' },
            pinkErrorBg: { hex: lessvars['@pinkErrorBg'], label: 'murstein rød / rosa' }
        }
    },
    pinkErrorBg: {
        hex: lessvars['@pinkErrorBg'],
        label: 'NAV Rosa',
        description: 'NAV Rosa er en støtte farge til Murstein Rød, og kan brukes som bakgrunn til feilmeldinger.',
        textColor: lessvars['@redError']
    },
    navGronn: {
        hex: lessvars['@navGronn'],
        label: 'NAV Grønn',
        description: 'NAV Grønn indikerer at en handling har blitt gjennomført og vellykket, skal sikre at bruker '
        + 'ikke sitter igjen med uløst forventinger eller lurer på om en oppgave er utfylt. '

    },
    navOransje: {
        hex: lessvars['@navOransje'],
        label: 'NAV Oransje',
        description: 'NAV Oransje skal brukes for å fremheve viktig innhold eller informasjon',
        textColor: lessvars['@navMorkGra']
    },
    orangeFocus: {
        hex: lessvars['@orangeFocus'],
        label: 'NAV Fokus Oransje',
        description:
            'NAV Fokus Oransje skal brukes som fokus farge ved tabbing. '
            + 'Skal også kunne brukes for å fremheve elementer'
            + ' som krever brukernes fokus. Påpeke hvor brukeren befinner seg, og øke brukervennlighet.',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], label: 'fokus oransje / mørk grå' }
        },
        textColor: lessvars['@navMorkGra']
    },
    navLimeGronn: {
        hex: lessvars['@navLimeGronn'],
        label: 'NAV Limegrønn',
        description: '',
        textColor: lessvars['@navMorkGra']
    },
    navLysBla: {
        hex: lessvars['@navLysBla'],
        label: 'NAV Lys blå',
        description: '',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], label: 'lys blå / mørk grå' }
        },
        textColor: lessvars['@navMorkGra']
    },
    navLysBla20: {
        hex: '#5EAEC7',
        label: 'NAV Lys Blå +20',
        description: '',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], label: 'lys blå +20 / mørk grå' }
        }
    },
    navBla40: {
        hex: '#19548A',
        label: 'NAV Lys Blå +40',
        description: '',
        contrastColors: {
            orangeFocus: { hex: lessvars['@orangeFocus'], label: 'blå +40 / fokus oransje' }
        }
    },
    hvit: {
        hex: '#fff',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], label: 'hvit / mørk grå' },
            redError: { hex: lessvars['@redError'], label: 'hvit / murstein rød' }
        }
    }
};

export default colors;
