import React from 'react';

import gridPng from './../../../assets/images/layout/grid.png';
import layoutExamplesPng from './../../../assets/images/layout/layoutexamples.png';

import './styles.less';

const LayoutPage = () => (
    <div className="layoutPage">
        <h1>Grid</h1>

        <p className="layoutPage__lead">
            Vår grid er oppbygd av 12 responsive kolonner med fast 16 px gutter og 32px margins
        </p>
        <img className="gridImage" src={gridPng} alt="" />


        <div className="layoutPage__section">
            <h1>Layout-eksempler</h1>
            <img className="gridImage" src={layoutExamplesPng} alt="" />
        </div>

    </div>
);

export default LayoutPage;
