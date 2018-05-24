import React from 'react';

import SectionTitle from './../../components/section-title/SectionTitle';
import { Innholdstittel } from './../../../../../packages/node_modules/nav-frontend-typografi';
import {
    ColorPaletteSection,
    ColorContrastSection
} from './sections';

import './styles.less';

const ColorPage = () => (
    <div className="colorPage">
        <div className="section">
            <SectionTitle title="Fargepaletten" />
            <div className="section">
                <ColorPaletteSection />
            </div>
        </div>

        <div className="section">
            <Innholdstittel>Fargekontrast mellom tekst og bakgrunn</Innholdstittel>
            <div className="section">
                <ColorContrastSection />
            </div>
        </div>
    </div>
);

export default ColorPage;
