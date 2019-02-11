import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { EtikettLiten } from './../../../../../packages/node_modules/nav-frontend-typografi';
import './styles.less';

class PropTypeTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            overflowRight: false,
            overflowLeft: false
        };
        window.addEventListener('resize', this.checkOverflow);
    }

    componentDidMount() {
        this.checkOverflow();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkOverflow);
    }

    checkOverflow = () => {
        let overflowLeft = false;
        let overflowRight = false;

        if (this.wrapper.offsetWidth < this.table.offsetWidth) {
            if (this.wrapper.scrollLeft !== 0) {
                overflowLeft = true;
            }
            if ((this.wrapper.scrollLeft + this.wrapper.offsetWidth) < this.table.offsetWidth) {
                overflowRight = true;
            }
        }

        this.setState({
            overflowLeft,
            overflowRight
        });
    }

    render() {
        const propTypes = this.props.docgenInfo.props;
        const keys = Object.keys(propTypes).sort();
        const propTypeDocs = keys.map((key) => ({
            propName: key,
            ...propTypes[key]
        }));

        const headers = ['Property', 'Type', 'Required', 'Description', 'Default'];
        const cls = () => cn('propTypeTableWrapperOuter', {
            'propTypeTableWrapperOuter--overflowLeft': this.state.overflowLeft,
            'propTypeTableWrapperOuter--overflowRight': this.state.overflowRight
        });

        return (
            <div className={cls()}>
                <div
                    className="propTypeTableWrapper"
                    ref={(node) => { this.wrapper = node; }}
                    onScroll={this.checkOverflow}
                >

                    <table className="tabell tabell--stripet" ref={(node) => { this.table = node; }}>
                        <thead>
                            <tr>
                                {
                                    headers.map((header, index) => (
                                        // eslint-disable-next-line react/no-array-index-key
                                        <PropTypeTableHeader val={header} index={index} key={index} />
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                propTypeDocs.filter((item) =>
                                    item.propName.indexOf('aria-') !== 0
                                ).map((propTypeDoc, key) => (
                                    <PropTypeTableRow
                                        val={{
                                            ...propTypeDoc,
                                            defaultValue: propTypeDoc.defaultValue ? propTypeDoc.defaultValue : '-'
                                        }}
                                        key={key} // eslint-disable-line react/no-array-index-key
                                    />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

PropTypeTable.propTypes = {
    docgenInfo: PT.shape({
        props: PT.shape({})
    })
};

PropTypeTable.defaultProps = {
    docgenInfo: {
        props: {}
    }
};

export default PropTypeTable;

const PropTypeTableHeader = (props) => (<th key={props.index}>{props.val}</th>);

PropTypeTableHeader.propTypes = {
    index: PT.number.isRequired,
    val: PT.string.isRequired
};

const parsePropValue = (val) => {
    if (val && typeof val === 'object') {
        if (val.name === 'enum') {
            return val.value.map((x) => x.value).join(' | ');
        }
        val = val.name || val.value; // eslint-disable-line no-param-reassign
    }
    if (val === null || typeof val === 'undefined' || val.length <= 0) {
        return '-';
    }
    return val.toString();
};

const parseDescription = (desc) => {
    const found = desc.match(/^@deprecated/);
    if (found) {
        return (<span><strong>{found[0]}</strong>{desc.substr(11, desc.length)}</span>);
    }
    return desc;
};

const PropTypeTableRow = (props) => {
    const desc = parseDescription(parsePropValue(props.val.description));
    return (
        <tr className={cn({ deprecated: typeof desc === 'object' })}>
            <td><strong>{parsePropValue(props.val.name)}</strong></td>
            <td><code className="inline">{parsePropValue(props.val.type)}</code></td>
            <td>{parsePropValue(props.val.required)}</td>
            <td>{desc}</td>
            <td>{parsePropValue(props.val.defaultValue)}</td>
        </tr>
    );
};

PropTypeTableRow.propTypes = {
    val: PT.shape({
        defaultValue: PT.any,
        description: PT.string,
        name: PT.string,
        propName: PT.string,
        required: PT.boolean,
        type: PT.any
    }).isRequired
};
