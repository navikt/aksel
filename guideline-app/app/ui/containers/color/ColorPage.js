import React from 'react';

import SectionTitle from './../../components/section-title/SectionTitle';
import { Systemtittel } from './../../../../../packages/node_modules/nav-frontend-typografi';
import {
    ColorPaletteSection,
    ColorContrastSection
} from './sections';

import './styles.less';

const ColorPage = () => (
    <div className="colorPage">
        <div className="section">
            <SectionTitle title="Farger" />
            <div className="section">
                <ColorPaletteSection />
            </div>
        </div>

        <div className="section">
            <Systemtittel>Fargekontrast mellom tekst og bakgrunn</Systemtittel>
            <hr />
            <div className="section">
                <ColorContrastSection />
            </div>
        </div>
    </div>
);

export default ColorPage;
