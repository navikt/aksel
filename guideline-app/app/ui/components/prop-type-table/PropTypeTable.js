import React from 'react';
import PT from 'prop-types';
import cn from 'classnames';
import { Normaltekst, EtikettLiten } from './../../../../../packages/node_modules/nav-frontend-typografi';
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

                    <table ref={(node) => { this.table = node; }}>
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
                                propTypeDocs.map((propTypeDoc, key) => (
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

const PropTypeTableHeader = (props) => (
    <th key={props.index}>
        <EtikettLiten>{props.val}</EtikettLiten>
    </th>
);

PropTypeTableHeader.propTypes = {
    index: PT.number.isRequired,
    val: PT.string.isRequired
};

const PropTypeTableRow = (props) => {
    const keys = Object.keys(props.val);

    return (
        <tr>
            {
                keys.map((key, index) => (
                    <PropTypeTableCell
                        val={props.val[key]}
                        key={index} // eslint-disable-line react/no-array-index-key
                    />
                ))
            }
        </tr>
    );
};

PropTypeTableRow.propTypes = {
    val: PT.shape({}).isRequired
};

const PropTypeTableCell = (props) => {
    let val = props.val;

    if (val && typeof val === 'object') {
        val = val.name || val.value;
    }
    if (!val || val.length <= 0) {
        val = '-';
    }

    return (
        <td>
            <Normaltekst>{ val.toString() }</Normaltekst>
        </td>
    );
};

PropTypeTableCell.propTypes = {
    val: PT.oneOfType([PT.string, PT.bool, PT.shape({}), PT.number])
};

PropTypeTableCell.defaultProps = {
    val: undefined
};
