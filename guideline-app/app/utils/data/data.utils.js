export const fillTypesAndModifiersWithCommonValue = (typeArray, value) => {
    typeArray.forEach((currentType) => {
        currentType.children = value;
        if (currentType.modifiers) {
            currentType.modifiers.forEach((currentModifier) => {
                currentModifier.children = value;
            });
        }
    });

    return typeArray;
};