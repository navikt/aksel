import React from 'react';
import Spinner from 'nav-frontend-spinner';

const SpinnerComp = (props) => {
    return (
        <Spinner
            storrelse={ props.storrelse }
            stroke={ props.stroke }
            negativ={ props.negativ }
        />
    );
};

const spinner = {
    children: '',
    types: [
        {
            component: (props) => (<SpinnerComp storrelse="xxs" { ... props } />),
            label: 'X Ekstra Liten (xxs)'
        },
        {
            component: (props) => (<SpinnerComp storrelse="xs" { ... props } />),
            label: 'Ekstra Liten (xs)'
        },
        {
            component: (props) => (<SpinnerComp storrelse="s" { ... props } />),
            label: 'Liten (s)'
        },
        {
            component: Spinner,
            label: 'Medium',
            _default: true
        },
        {
            component: (props) => (<SpinnerComp storrelse="l" { ... props } />),
            label: 'Stor (l)'
        },
        {
            component: (props) => (<SpinnerComp storrelse="xl" { ... props } />),
            label: 'Ekstra Stor (xl)'
        },
        {
            component: (props) => (<SpinnerComp storrelse="xxl" { ... props } />),
            label: 'X Ekstra Stor (xxl)'
        },
        {
            component: (props) => (<SpinnerComp storrelse="xxxl" { ... props } />),
            label: 'XX Ekstra Stor (xxxl)'
        }
    ],
    multipleChoiceModifiers: [
        { value: 'stroke', label: 'Stroke' },
        { value: 'negativ', label: 'Negativ', }
    ]
};

export default spinner;