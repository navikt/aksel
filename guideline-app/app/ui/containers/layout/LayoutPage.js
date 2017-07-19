import React from 'react';

import './styles.less';

export class LayoutPage extends React.Component {

  componentWillMount() {

  }

  render() {
    return (
      <div className="layoutPage">
        <h1>Grid</h1>

        <p className="layoutPage__lead">
            Vår grid er oppbygd av 12 responsive kolonner med fast 16 px gutter og 32px margins
        </p>
        <img className="gridImage" src="app/assets/images/layout/grid.png" alt=""/>


        <div className="layoutPage__section">
            <h1>Layout-eksempler</h1>
            <img className="gridImage" src="app/assets/images/layout/layoutexamples.png" alt=""/>
        </div>

      </div>
    );
  }
}
