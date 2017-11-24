import lessToJs from 'less-vars-to-js';
import vars from '!raw-loader!nav-frontend-core/less/_variabler.less'; // eslint-disable-line import/no-webpack-loader-syntax, max-len, import/no-unresolved

const lessvars = lessToJs(vars);

const colors = {
    navRod: {
        hex: lessvars['@navRod'],
        label: 'NAV Rød',
        wcag: 'AA 6.32',
        description: 'NAV Rød er hovedprofilfarge. Brukes i logoen og enkelte elementer som bærer identiteten til NAV.'
    },
    navMorkGra: {
        hex: lessvars['@navMorkGra'],
        label: 'NAV Mørk grå',
        wcag: 'AAA 11.55',
        description: `
            NAV Mørk grå er vår tekstfarge og en variasjon av grå som ikke oppfattes så skarp på en 
            lys bakgrunn. Hvit eller NAV Lys grå, er mer behagelig å se på og øker lesbarheten
        `,
        contrastColors: {
            hvit: { hex: '#fff', wcag: 'AAA 11.55', label: 'mørk grå / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], wcag: 'AAA 10.05', label: 'mørk grå / lys grå' },
            orangeFocus: { hex: lessvars['@orangeFocus'], wcag: 'AAA 7.0', label: 'mørk grå / fokus oransje' },
            navGra20: { hex: lessvars['@navGra20'], wcag: '6.53', label: 'mørk grå / grå 20' },
            navGra40: { hex: lessvars['@navGra40'], wcag: '5.53', label: 'mørk grå / grå 40' }
        }
    },
    navLysGra: {
        hex: lessvars['@navLysGra'],
        label: 'NAV Lys grå',
        wcag: 'AA 6.53',
        description: 'Bakgrunn skal hovedsakelig være lys og luftig, med mye bruk av hvit og NAV lys grå.',
        textColor: lessvars['@navMorkGra']
    },
    navGra80: {
        hex: lessvars['@navGra80'],
        label: 'NAV Grå +80',
        wcag: '',
        description: '',
        contrastColors: {
            hvit: { hex: '#fff', wcag: 'AAA 7.77', label: 'grå 80 / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], wcag: 'AA 6.76', label: 'grå 80 / lys grå' }
        }
    },
    navGra60: {
        hex: lessvars['@navGra60'],
        label: 'NAV Grå +60',
        wcag: '',
        description: '',
        contrastColors: {
            hvit: { hex: '#fff', wcag: 'AA.486', label: 'grå 60 / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], wcag: 'AA Large 4.22', label: 'grå 60 / lys grå' }
        }
    },
    navBla: {
        hex: lessvars['@navBla'],
        label: 'NAV Blå',
        wcag: 'AA 5.61',
        description: 'NAV Blå skal indikere mulighet for interaksjon med et visuelt element. Eks. ' +
        'Lenker, knapper, ikoner.',
        contrastColors: {
            hvit: { hex: '#fff', wcag: 'AA 5.6', label: 'blå / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], wcag: 'AA 4.87', label: 'blå / lys grå' }
        }
    },
    navDypBla: {
        hex: lessvars['@navDypBla'],
        label: 'NAV Dyp Blå',
        wcag: 'AAA 7.45',
        description: 'NAV Dyp Blå benyttes som støtte farge til NAV blå for å indikere forandring i status. ' +
        'Fra interaksjon til aktivt',
        contrastColors: {
            hvit: { hex: '#fff', wcag: 'AAA 7.45', label: 'dyp blå / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], wcag: 'AA 6.48', label: 'dyp blå / lys grå' },
            orangeFocus: { hex: lessvars['@orangeFocus'], wcag: 'AA 4.51', label: 'dyp blå / fokus oransje' }
        }
    },
    navLilla: {
        hex: lessvars['@navLilla'],
        label: 'NAV Lilla',
        wcag: 'AAA 7.59',
        description: 'NAV Lilla benyttes som støtte farge til NAV dyp blå for å indikere en tredje status ' +
        'forskjell. Fra aktivt til “besøkt”',
        contrastColors: {
            hvit: { hex: '#fff', wcag: 'AAA 7.58', label: 'lilla / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], wcag: 'AA 6.59', label: 'lilla / lys grå' },
            orangeFocus: { hex: lessvars['@orangeFocus'], wcag: 'AA 4.59', label: 'lilla / fokus oransje' }
        }
    },
    navLilla60: {
        hex: '#C1B5D0',
        label: 'NAV Lilla -60',
        wcag: '',
        description: '',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], wcag: 'AAA 7.58', label: 'lilla -60 / mørk grå' }
        }
    },
    redError: {
        hex: lessvars['@redError'],
        label: 'NAV Murstein Rød',
        wcag: 'AA 5.64',
        description: 'NAV Murstein Rød indikerer feil eller mangel av informasjon. Kan også indikere at en handling ' +
        'fra bruker kan medføre tap av data eller avbryte en pågående prosess.',
        contrastColors: {
            hvit: { hex: '#fff', wcag: 'AA 5.65', label: 'murstein rød / hvit' },
            navLysGra: { hex: lessvars['@navLysGra'], wcag: 'AA 4.91', label: 'murstein rød / lys grå' },
            pinkErrorBg: { hex: lessvars['@pinkErrorBg'], wcag: 'AA 4.67', label: 'murstein rød / rosa' }
        }
    },
    pinkErrorBg: {
        hex: lessvars['@pinkErrorBg'],
        label: 'NAV Rosa',
        wcag: 'AA 4.54',
        description: 'NAV Rosa er en støtte farge til Murstein Rød, og kan brukes som bakgrunn til feilmeldinger.',
        textColor: lessvars['@redError']
    },
    navGronn: {
        hex: lessvars['@navGronn'],
        label: 'NAV Grønn',
        wcag: 'AA 4.52',
        description: 'NAV Grønn indikerer at en handling har blitt gjennomført og vellykket, skal sikre at bruker ' +
        'ikke sitter igjen med uløst forventinger eller lurer på om en oppgave er utfylt. '

    },
    navOransje: {
        hex: lessvars['@navOransje'],
        label: 'NAV Oransje',
        wcag: 'AA 5.12',
        description: 'NAV Oransje skal brukes for å fremheve viktig innhold eller informasjon',
        textColor: lessvars['@navMorkGra']
    },
    orangeFocus: {
        hex: lessvars['@orangeFocus'],
        label: 'NAV Fokus Oransje',
        wcag: 'AAA 7.0',
        description:
            'NAV Fokus Oransje skal brukes som fokus farge ved tabbing. ' +
            'Skal også kunne brukes for å fremheve elementer' +
            ' som krever brukernes fokus. Påpeke hvor brukeren befinner seg, og øke brukervennlighet.',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], wcag: 'AA 7.0', label: 'fokus oransje / mørk grå' }
        },
        textColor: lessvars['@navMorkGra']
    },
    navLimeGronn: {
        hex: lessvars['@navLimeGronn'],
        label: 'NAV Limegrønn',
        wcag: 'AA 4.68',
        description: '',
        textColor: lessvars['@navMorkGra']
    },
    navLysBla: {
        hex: lessvars['@navLysBla'],
        label: 'NAV Lys blå',
        wcag: 'AAA 6.23',
        description: '',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], wcag: 'AA 6.23', label: 'lys blå / mørk grå' }
        },
        textColor: lessvars['@navMorkGra']
    },
    navLysBla20: {
        hex: '#5EAEC7',
        label: 'NAV Lys Blå +20',
        wcag: '',
        description: '',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], wcag: 'AAA 7.45', label: 'lys blå +20 / mørk grå' }
        }
    },
    navBla40: {
        hex: '#19548A',
        label: 'NAV Lys Blå +40',
        wcag: '',
        description: '',
        contrastColors: {
            orangeFocus: { hex: lessvars['@orangeFocus'], wcag: 'AA 4.75', label: 'blå +40 / fokus oransje' }
        }
    },
    hvit: {
        hex: '#fff',
        contrastColors: {
            navMorkGra: { hex: lessvars['@navMorkGra'], wcag: 'AAA 11.55', label: 'hvit / mørk grå' },
            redError: { hex: lessvars['@redError'], wcag: 'AA 5.65', label: 'hvit / murstein rød' }
        }
    }
};

export default colors;
