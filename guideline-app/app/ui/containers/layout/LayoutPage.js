import React from 'react';
import { // eslint-disable-line import/no-extraneous-dependencies
    Systemtittel,
    Ingress
} from 'NavFrontendModules/nav-frontend-typografi'; // eslint-disable-line import/extensions, import/no-unresolved
import SectionTitle from './../../components/section-title/SectionTitle';
import gridPng from './../../../assets/images/layout/grid.png';
import layoutExamplesPng from './../../../assets/images/layout/layoutexamples.png';

import './styles.less';

const LayoutPage = () => (
    <div className="layoutPage">
        <SectionTitle title="Grid" />

        <div className="section">
            <Ingress>
                Vår grid er oppbygd av 12 responsive kolonner med fast 16 px gutter og 32px margins
            </Ingress>

            <p>
                <img className="gridImage" src={gridPng} alt="Grid med 12 kolonner med margins" />
            </p>
        </div>


        <div className="section">
            <Systemtittel>
                Layout-eksempler
            </Systemtittel>
            <p>
                <img
                    className="gridImage"
                    src={layoutExamplesPng}
                    alt="eksempler på hvordan elementer kan plasseres i NAVs grid"
                />
            </p>
        </div>

    </div>
);

export default LayoutPage;
