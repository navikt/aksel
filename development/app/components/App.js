import React from 'react';

import Knapp from 'NavFrontendModules/nav-frontend-knapper';
import Popover from 'NavFrontendModules/nav-frontend-popover';
import Lenke from 'NavFrontendModules/nav-frontend-lenker';
import Hjelpetekst from 'NavFrontendModules/nav-frontend-hjelpetekst';

import { Systemtittel, Undertittel } from 'NavFrontendModules/nav-frontend-typografi';

import './styles.less';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            anker1: undefined
        };
    }

    togglePopover = (popover, anker) => {
        const newState = Object.assign({}, this.state);
        newState[popover] = (newState[popover]) ? undefined : anker;
        this.setState(newState);
    }

    render(){
        return (
            <div className="centered-example">
                <Knapp>HM</Knapp>
                <p style={{maxWidth: 700, lineHeight: '1.5rem'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sollicitudin molestie tristique. Vestibulum 
                    at mi lobortis, pretium felis eu, tincidunt velit. Aliquam ac dui id nisl suscipit euismod non nec felis. 
                    Donec suscipit mi ut metus interdum <Lenke onMouseLeave={() => this.setState({anker1: undefined})} onMouseEnter={(e) => this.togglePopover('anker1', e.currentTarget)}>tincidunt</Lenke> eget eu orci. Aliquam vitae risus mollis, ullamcorper arcu 
                    vitae, semper magna. Praesent tincidunt maximus nulla, ut vehicula velit consequat a. Quisque <Lenke onClick={(e) => this.togglePopover('anker1', e.currentTarget)}>pulvinar</Lenke> sem nibh, in aliquam enim gravida a.
                </p>
                <Hjelpetekst>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Hjelpetekst>
                <br/>
                <br/>
                <br/>
                <div align="center">
                    <Knapp onClick={(e) => this.togglePopover('anker1', e.currentTarget)}>Yo</Knapp>
                </div>
                <Popover
                    ankerEl={this.state.anker1}
                    onClose={() => this.setState({anker1: undefined})}
                    orientering="over-høyre"
                >
                    <p align="center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                </Popover>
            </div>
        );
    }
}