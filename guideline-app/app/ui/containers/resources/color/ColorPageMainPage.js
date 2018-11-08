import React from 'react';

import { Innholdstittel } from 'NavFrontendModules/nav-frontend-typografi';

import Palette from './tabs/Palette';
import Accessibility from './tabs/Accessibility.mdx';
import Technical from './tabs/Technical';

import MdxContent from './../../../components/mdx-content/MdxContent';
import TabbedContainer from './../../tabbed-container/TabbedContainer';

import './styles.less';

class ColorPageMainPage extends React.Component {

    constructor(props) {
        super(props);

        this.tabs = [
            {
                label: 'Fargepalett',
                content: Palette
            },
            {
                id: 'accessibility',
                label: 'Tilgjengelighet',
                content: MdxContent
            },
            {
                id: 'technical',
                label: 'Teknisk',
                content: Technical
            }
        ];
    }

    render() {
        return (
            <React.Fragment>
                <Innholdstittel>Farger</Innholdstittel>
                <TabbedContainer tabs={this.tabs} {...this.props} />
            </React.Fragment>
        );
    }
}

export default ColorPageMainPage;
