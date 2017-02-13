import React, { Component } from 'react';
import { render } from 'react-dom';
import Komponent from './src/index';

class Eksempel extends Component {
    render() {
        return (
            <Komponent />
        );
    }
}

render(<Eksempel />, document.getElementById('komponent'));
