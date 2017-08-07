import React from 'react';

import { Normaltekst, EtikettLiten } from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less';

export const PropTypeTable = (props) => {
    const propTypes = props.docgenInfo.props;
    const keys = Object.keys(propTypes).sort();
    const propTypeDocs = keys.map((key) => ({
        propName: key,
        ... propTypes[key]
    }));

    const headers = ['Property', 'Type', 'Required', 'Description', 'Default'];

    return (
        <div className="propTypeTableWrapper">
            <table>
                <thead>
                    <tr>
                        {
                            headers.map((header, index) => (
                                <PropTypeTableHeader val={ header } index={ index } key={ index } />
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        propTypeDocs.map((propTypeDoc, key) => {
                            return (
                                <PropTypeTableRow
                                    val={ {
                                        ... propTypeDoc,
                                        defaultValue: propTypeDoc.defaultValue ? propTypeDoc.defaultValue : '-'
                                    } }
                                    key={ key }
                                />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

const PropTypeTableHeader = (props) => (
    <th key={ props.index }>
        <EtikettLiten>{ props.val }</EtikettLiten>
    </th>
);

const PropTypeTableRow = (props) => {
    const keys = Object.keys(props.val);

    return (
        <tr>
            {
                keys.map((key, index) => (
                    <PropTypeTableCell
                        val={ props.val[key] }
                        key={ index }
                    />
                ))
            }
        </tr>
    );
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