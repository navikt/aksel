import React from 'react';

import { SectionTitle } from './../../components/section-title/SectionTitle';
import {
    ColorPaletteSection,
    ColorContrastSection
} from './sections';

import './styles.less';

export class ColorPage extends React.Component {

    render () {
        return (
            <div className="colorPage">
                <div className="section">
                    <SectionTitle title="Fargepaletten" />
                    <ColorPaletteSection />
                </div>

                <div className="section">
                    <SectionTitle title="Fargekontrast mellom tekst og bakgrunn" />
                    <ColorContrastSection />
                </div>
            </div>
        );
    }

}