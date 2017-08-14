const toFirstUpper = (str) => (str.charAt(0).toUpperCase() + str.slice(1));

export const createSampleData = (allTypes, base) => {
    const types = allTypes.map((type, tIndex) => {
        let modifiers;

        if (type.modifiers && Array.isArray(type.modifiers)) {
            modifiers = type.modifiers.map((modifier) => ({
                value: modifier.value,
                component: modifier.component,
                children: 'Slik ser en Alertstripe ut'
            }))
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
            type.modifiers.forEach((modifier, index) => {
                modifiers.push({
                    _default: index === 0,
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