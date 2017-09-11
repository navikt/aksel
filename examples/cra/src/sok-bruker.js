import React, { Component } from 'react';
import { Input } from 'nav-frontend-skjema';
import { Hovedknapp } from 'nav-frontend-knapper';

class SokBruker extends Component {
    state = {
        fnr: ''
    };
    onChange = (event) => {
        this.setState({ fnr: event.target.value });
    };

    onSubmit = (event) => {
        console.log('this.refs.fnr', this.state.fnr);
        event.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.onSubmit} style={{ textAlign: 'left', width: '100%', maxWidth: '20rem', margin: '0 auto' }}>
                <Input label="Fødselsnummer: " bredde="xl" value={this.state.fnr} onChange={this.onChange}/>
                <Hovedknapp>Søk</Hovedknapp>
            </form>
        );
    }
}

export default SokBruker;
