import metadata from './propTypes.metadata';
import { newType, newMultipleChoiceModifier, createSampleData } from './sampleDataHelper';

const typeAttributeName = metadata.typeAttributeName;
const inputTypeAttributeName = metadata.inputTypeAttributeName;
const validModifierNames = metadata.modifierNames;

const isEnum = (propType) => (propType.name === 'enum');
const isBool = (propType) => (propType.name === 'bool');
const removeSpecialCharacters = (str) => (str.replace(/['"]/g, ''));
const toFirstUpper = (str) => (str.charAt(0).toUpperCase() + str.slice(1));

const getTypeNameToUseForComponent = (component) => {
    // eslint-disable-next-line no-underscore-dangle
    const props = component.__docgenInfo.props;
    if (props[typeAttributeName]) {
        return typeAttributeName;
    }
    return inputTypeAttributeName;
};

const getEnumValuesFromPropType = (propType) => {
    const enumObjects = propType.type.value;
    return enumObjects.map((enumObject) => (removeSpecialCharacters(enumObject.value)));
};

const getTypeNamesOfComponent = (component) => {
    // eslint-disable-next-line no-underscore-dangle
    const propType = component.__docgenInfo.props[getTypeNameToUseForComponent(component)];
    if (propType) {
        if (isEnum(propType.type)) {
            return getEnumValuesFromPropType(propType);
        }
    }
    return [component.name];
};

const getModifiersOfComponent = (component) => {
    // eslint-disable-next-line no-underscore-dangle
    const props = component.__docgenInfo.props;
    const modifierNames = Object.keys(props).filter((propName) => (validModifierNames.indexOf(propName) >= 0));
    return modifierNames.map((modifierName) => ({ name: modifierName, value: props[modifierName] }));
};

const sampleScript = (subTypes, baseType, attrs, children) => {
    if (!subTypes && baseType) {
        const typeNamesOfComponent = getTypeNamesOfComponent(baseType);
        const modifiersOfComponent = getModifiersOfComponent(baseType);

        if (typeNamesOfComponent) {
            const sampleTypes = typeNamesOfComponent.map((typeName) => {
                const newAttrs = {};
                if (typeNamesOfComponent.length > 1) {
                    newAttrs[getTypeNameToUseForComponent(baseType)] = typeName;
                }
                return newType(baseType, toFirstUpper(typeName), children, Object.assign(newAttrs, attrs));
            });

            // eslint-disable-next-line array-callback-return, consistent-return
            const sampleModifiers = modifiersOfComponent.map((modifier) => {
                const propType = modifier.value;
                if (isBool(propType.type)) {
                    return newMultipleChoiceModifier(modifier.name, toFirstUpper(modifier.name));
                }
                return newMultipleChoiceModifier(metadata.defaultValues[modifier.name], toFirstUpper((modifier.name)));
            });

            return createSampleData(sampleTypes, sampleModifiers, baseType);
        }
    }
    return null;
};

export default sampleScript;
