import React from 'react';
import classnames from 'classnames';

import Code from './../code/Code';
import PropTypeTable from './../prop-type-table/PropTypeTable';

import Panel from 'NavFrontendModules/nav-frontend-paneler';
import { Systemtittel, Undertittel } from 'NavFrontendModules/nav-frontend-typografi';

import './styles.less';

class ModuleBrowser extends React.Component {
    constructor(props){
        super(props);
        this.modules = Object.keys(this.props.data.packageModules).sort().map(key => this.props.data.packageModules[key]);
        this.modules = this.props.data.packageModules;
        this.state = {
            activeModule: this.getInitialActiveModule()
        }
    }

    getInitialActiveModule = () => {
        const urlComponentName = window.location.pathname.split('/')[2];
        const componentIndex = Object.keys(this.modules).findIndex((key) => key.toLowerCase() === urlComponentName);
        const defaultIndex = Object.keys(this.modules).findIndex((key) => key === 'default');
        
        let index = (defaultIndex !== -1) ? defaultIndex : componentIndex ;

        return Object.keys(this.modules).find((module, i) => i === index);
    }

    generateImportStatement = (moduleName) => {
        const module = this.modules[moduleName];
        const format = (moduleName === 'default') ? module['__docgenInfo']['displayName'] : `{ ${moduleName} }`;
        return `import ${format} from '${this.props.package.name}';`;
    }

    setActiveModule = (e, moduleName) => {
        e.preventDefault();
        this.setState({ activeModule: moduleName });
    }

    render(){
        return (
            <div className="module-browser">
                <Systemtittel>Moduler</Systemtittel>
                <Panel border className="module-browser__wrapper">
                    <nav>
                        <ul className="nav-list">
                            {
                                Object.keys(this.modules).sort().map((moduleName, i) => {
                                    const module = this.modules[moduleName];

                                    if (!module['__docgenInfo']) return;

                                    return (
                                        <li key={i}>
                                            <a 
                                                href="#" 
                                                className={classnames({'active': this.state.activeModule === moduleName})}
                                                onClick={(e) => this.setActiveModule(e, moduleName)}
                                            >
                                                { module['__docgenInfo'].displayName }
                                                &nbsp;
                                                { moduleName === 'default' && `(${moduleName})` }
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                    <div className="module-browser__content">
                        <Undertittel>Import</Undertittel>
                        <Code>{this.generateImportStatement(this.state.activeModule)}</Code>
                        <Undertittel>React props</Undertittel>
                        <PropTypeTable docgenInfo={this.modules[this.state.activeModule].__docgenInfo} />
                    </div>
                </Panel>
            </div>
        );
    }
}

export default ModuleBrowser;