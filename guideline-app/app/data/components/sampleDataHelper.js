const toFirstUpper = (str) => (str.charAt(0).toUpperCase() + str.slice(1));

const isArrayWithContents = (arr) => (arr && Array.isArray(arr) && arr.length > 0);

function duplicateModifiers (modifier1, index, array) {
    return index === array.findIndex(
        (modifier2) =>
            (modifier1.value === modifier2.value || modifier1.label === modifier2.label)
    );
}

const createModifierArrayFromTypesWithModifiers = (types) => {
    let modifierArray = [{ _default: true, value: 'normal', label: 'Normal' }];
    types.forEach((type) => {
        type.modifiers.forEach((modifier) => (modifierArray.push(modifier)));
    });
    return modifierArray.filter(duplicateModifiers);
};

const createTypesWithModifiers = (types) => (
    types.map((type) => {
        let typeModifiers = type.modifiers;
        typeModifiers.push({
            component: type.component,
            children: type.children,
            value: 'normal'
        });

        return {
            component: type.component,
            label: type.label,
            children: type.children,
            modifiers: typeModifiers
        }
    })
);

const createSampleDataFromTypes = (allTypes, base) => {
    let types, globalModifiers;
    const hasTypesWithModifiers = allTypes.some((type) => (isArrayWithContents(type.modifiers)));

    if (hasTypesWithModifiers) {
        globalModifiers = createModifierArrayFromTypesWithModifiers(allTypes);
        types = createTypesWithModifiers(allTypes);
    }

    (types || allTypes)[0]._default = true;
    return {
        types: types || allTypes,
        modifiers: globalModifiers,
        base: base
    }
};

export const createSampleData = (allTypes, allModifiers, baseType) => {
    const hasModifiersOnRoot = isArrayWithContents(allModifiers);
    const base = baseType ? { base: baseType } : {};
    const sampleData = {
        ... base,
        ... createSampleDataFromTypes(allTypes, baseType)
    };

    if (!hasModifiersOnRoot) {
        return sampleData;
    }

    return { ... sampleData, multipleChoiceModifiers: allModifiers };
};

export const newType = (component, label, modifs, children) => {
    return {
        component: component,
        children: children,
        label: toFirstUpper(label),
        modifiers: (modifs||[]).map((modif) => ({ ... modif, children: children }))
    }
};

export const newSingleChoiceModifier = (component, value) => {
    return {
        component: component,
        label: toFirstUpper(value),
        value: value
    }
};

export const newMultipleChoiceModifier = (value, label) => {
    return {
        label: label,
        value: value
    }
};