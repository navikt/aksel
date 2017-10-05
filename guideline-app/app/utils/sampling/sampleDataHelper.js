const toFirstUpper = (str) => (str.charAt(0).toUpperCase() + str.slice(1));

const isArrayWithContents = (arr) => (arr && Array.isArray(arr) && arr.length > 0);

function duplicateModifiers(modifier1, index, array) {
    return index === array.findIndex(
        (modifier2) =>
            (modifier1.value === modifier2.value || modifier1.label === modifier2.label)
    );
}

const createModifierArrayFromTypesWithModifiers = (types) => {
    const modifierArray = [{ _default: true, value: 'normal', label: 'Normal' }];
    types.forEach((type) => {
        type.modifiers.forEach((modifier) => (modifierArray.push(modifier)));
    });
    return modifierArray.filter(duplicateModifiers);
};

const addDefaultModifierToTypes = (types) => (
    types.map((type) => {
        type.modifiers.push({
            component: type.component,
            children: type.children,
            value: 'normal'
        });
        return type;
    })
);

const createSampleDataFromTypes = (allTypes, base) => {
    let types;
    let globalModifiers;
    const hasTypesWithModifiers = allTypes.some((type) => (isArrayWithContents(type.modifiers)));

    if (hasTypesWithModifiers) {
        globalModifiers = createModifierArrayFromTypesWithModifiers(allTypes);
        types = addDefaultModifierToTypes(allTypes);
    }

    (types || allTypes)[0]._default = true; // eslint-disable-line no-underscore-dangle, no-param-reassign
    return {
        base,
        types: types || allTypes,
        modifiers: globalModifiers
    };
};

export const createSampleData = (allTypes, allModifiers, baseType) => {
    const hasModifiersOnRoot = isArrayWithContents(allModifiers);
    const base = baseType ? { base: baseType } : {};
    const sampleData = {
        ...base,
        ...createSampleDataFromTypes(allTypes, baseType)
    };

    if (!hasModifiersOnRoot) {
        return sampleData;
    }

    return { ...sampleData, multipleChoiceModifiers: allModifiers };
};

export const newType = (component, label, children, attrs = {}, modifs) => ({
    attrs,
    children,
    component,
    label: toFirstUpper(label),
    modifiers: (modifs || []).map((modif) => ({ ...modif, children }))
});

export const newSingleChoiceModifier = (component, value) => ({ component, value, label: toFirstUpper(value) });
export const newMultipleChoiceModifier = (value, label) => ({ label, value });
