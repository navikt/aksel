import React from 'react';

import './styles.less';

export const PropTypeList = (props) => {
    const propTypes = props.docgenInfo.props;
    const keys = Object.keys(propTypes).sort();
    const propTypeDocs = keys.map((key) => ({
        propName: key,
        ... propTypes[key]
    }));

    return (
        <div className="propTypeList">
            <table>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        propTypeDocs.map((propTypeDoc, key) => (
                            <PropTypeListItem { ... propTypeDoc } key={ key } />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

const PropTypeListItem = (props) => {
    return (
        <tr>
            <td key={ 1 }>{ props.propName }</td>
            <td key={ 2 }>{ props.type.name }</td>
            <td key={ 3 }>{ props.required.toString() }</td>
            <td key={ 4 }>{ props.defaultValue && props.defaultValue.value || '-' }</td>
            <td key={ 5 }>{ props.description || '-' }</td>
        </tr>
    );
};