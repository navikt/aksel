const toFirstUpper = (str) => (str.charAt(0).toUpperCase() + str.slice(1));

export const createSampleData = (allTypes, base) => {
    const types = allTypes.map((type, tIndex) => {
        let modifiers;

        if (type.modifiers && Array.isArray(type.modifiers)) {
            modifiers = type.modifiers.map((modifier) => ({
                value: modifier.value,
                component: modifier.component,
                children: 'Slik ser en Alertstripe ut'
            }));

            if (modifiers.length > 0) {
                modifiers.unshift({
                    value: 'normal',
                    component: type.component,
                    children: 'Slik ser en Alertstripe ut'
                });
            }
        }

        return {
            component: type.component,
            children: 'Slik ser en Alertstripe ut',
            label: type.label,
            _default: tIndex === 0,
            modifiers: modifiers
        }
    });

    let modifiers = [];
    allTypes.forEach((type) => {
        if (type.modifiers && Array.isArray(type.modifiers)) {
            if (type.modifiers.length > 0) {
                modifiers = [{ _default: true, value: 'normal', label: 'Normal' }];
            }

            type.modifiers.forEach((modifier) => {
                modifiers.push({
                    value: modifier.value,
                    label: modifier.label
                })
            });
        }
    });

    return {
        types: types,
        modifiers: modifiers,
        base: base
    }
};

export const addType = (component, label, modifs) => {
    return {
        component: component,
        label: toFirstUpper(label),
        modifiers: modifs
    }
};

export const addModifier = (component, value) => {
    return {
        component: component,
        label: toFirstUpper(value),
        value: value
    }
};