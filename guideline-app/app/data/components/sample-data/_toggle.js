import React from 'react';

import {
    ToggleGruppe,
    ToggleKnapp
} from './../../../../../packages/node_modules/nav-frontend-toggle';

const ToggleComp = (props) => {
    const dummy = new Array(props.numBtns).fill(0);

    return (
            <ToggleGruppe onChange={()=>{}} name="gruppe">
                {
                    dummy.map((v, i) => {
                        let opts = { key: i, value: 'knapp' + i };
                        if (props.defaultChecked === i) {
                            opts.defaultChecked = true;
                        }

                        return(
                            <ToggleKnapp { ... opts }>Knapp { i + 1 }</ToggleKnapp>
                        );
                    })
                }
            </ToggleGruppe>
    )
};

const toggle = {
    children: '',
    types: [
        { component: () => <ToggleComp numBtns={ 2 } defaultChecked={ 0 } />, label: '2 valg' },
        { component: () => <ToggleComp numBtns={ 3 } defaultChecked={ 1 } />, label: '3 valg', _default: true },
        { component: () => <ToggleComp numBtns={ 4 } defaultChecked={ 0 } />, label: '4 valg' },
        { component: () => <ToggleComp numBtns={ 5 } defaultChecked={ 2 } />, label: '5 valg' }
    ]
};

export default toggle;