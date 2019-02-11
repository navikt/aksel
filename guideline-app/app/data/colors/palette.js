import lessToJs from 'less-vars-to-js';
import vars from '!raw-loader!nav-frontend-core/less/_variabler.less'; // eslint-disable-line import/no-webpack-loader-syntax, max-len, import/no-unresolved

const lessvars = lessToJs(vars);

const palette = {
    '@redError': lessvars['@redError'],
    '@navOransje': lessvars['@navOransje'],
    '@orangeFocus': lessvars['@orangeFocus'],
    '@navLimeGronn': lessvars['@navLimeGronn'],
    '@navGronn': lessvars['@navGronn'],
    '@navLilla': lessvars['@navLilla'],
    '@navDypBla': lessvars['@navDypBla'],
    '@navBla': lessvars['@navBla'],
    '@navLysBla': lessvars['@navLysBla']
};

export default palette;
