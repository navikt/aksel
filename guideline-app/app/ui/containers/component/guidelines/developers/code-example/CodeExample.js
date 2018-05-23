import React, { Component } from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import hljs from 'highlight.js';
import Tabs from './../../../../../../../../packages/node_modules/nav-frontend-tabs';
import {
    getHtmlCodeForComponent,
    getReactCodeForComponent,
    getCSSCodeForComponent
} from '../../../../../../utils/dom/code-sampling.utils';
import './styles.less';

class CodeExample extends Component {

    componentWillMount() {
        this.tabbarItems = this.getTabbarItems();
        console.log(this.tabbarItems);
        this.setState({
            activeTabbarItem:
            this.tabbarItems.find((item) => item.defaultActive) ||
            this.tabbarItems.find((item) => item.show === true)
        });
    }

    getCodeToDisplayForTabFn(tabName) {
        switch (tabName) {
            case 'react':
                return (type, modifiers, children) => (getReactCodeForComponent(type, modifiers, children));
            case 'html':
                return (type, modif, children) => (getHtmlCodeForComponent(type, modif, children));
            case 'css':
                return (ref) => (getCSSCodeForComponent(ref));
            case 'js':
                // eslint-disable-next-line react/prop-types
                return () => (this.props.componentData.tabOptions.js.code);
            default:
                return () => {};
        }
    }

    getTabbarItems() {
        const tabOptions = this.props.componentData.tabOptions;
        const namesOfAllPossibleTabOptions = Object.keys(tabOptions);
        const options = namesOfAllPossibleTabOptions
            .filter((tabName) => (tabOptions[tabName].show === true))
            .map((tabName) => ({
                codeToDisplay: this.getCodeToDisplayForTabFn(tabName),
                ...tabOptions[tabName]
            }));
        return options;
    }

    getCodeToDisplay() {
        const type = this.props.activeType;
        const modifiers = this.props.activeMultipleChoiceModifiers;
        const children = type.children;
        const domRef = this.props.activeRef;
        const activeTabbarItem = this.state.activeTabbarItem;
        const hljsLangKey = this.state.activeTabbarItem.hljs;

        let codeToDisplay = '';
        if (activeTabbarItem.label === 'CSS') {
            codeToDisplay = activeTabbarItem.codeToDisplay(domRef);
        } else {
            codeToDisplay = activeTabbarItem.codeToDisplay(type, modifiers, children);
        }

        return hljs.highlight(hljsLangKey, codeToDisplay).value;
    }


    changeActiveContent = (e, index) => {
        this.setState({ activeTabbarItem: this.tabbarItems[index] });
    }

    render() {
        return (
            <div className="codeExample">
                <Tabs 
                    onChange={this.changeActiveContent}
                    defaultAktiv={Math.max(0, this.tabbarItems.findIndex((item) => item.defaultActive))}
                    kompakt
                >
                    {this.tabbarItems.map((item) => <Tabs.Tab key={item.label}>{item.label}</Tabs.Tab>)}
                </Tabs>
                <pre>
                    <code
                        className="hljs"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{ __html: this.getCodeToDisplay() }}
                    />
                </pre>
            </div>
        );
    }
}

CodeExample.propTypes = {
    activeType: PT.shape({
        component: PT.func
    }).isRequired,
    activeRef: PT.shape({}),
    activeMultipleChoiceModifiers: PT.arrayOf(PT.shape({})),
    componentData: PT.shape({}).isRequired
};

CodeExample.defaultProps = {
    activeMultipleChoiceModifiers: [],
    activeRef: {}
};

// eslint-disable-next-line no-class-assign
CodeExample = connect((state) => ({
    activeType: state.sample.activeType,
    activeMultipleChoiceModifiers: state.sample.activeMultipleChoiceModifiers,
    activeRef: state.sample.activeRef
}))(CodeExample);

export default CodeExample;
