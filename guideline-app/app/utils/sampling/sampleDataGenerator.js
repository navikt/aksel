import deepmerge from 'deepmerge';
import metadata from './propTypes.metadata';
import { newType, newMultipleChoiceModifier, createSampleData } from './sampleDataHelper';

const typeAttributeName = metadata.typeAttributeName;
const inputTypeAttributeName = metadata.inputTypeAttributeName;

const isEnum = (propType) => (propType.name === 'enum');
const isBool = (propType) => (propType.name === 'bool');
const removeSpecialCharacters = (str) => (str.replace(/['"]/g, ''));
const toFirstUpper = (str) => (str.charAt(0).toUpperCase() + str.slice(1));

const defaultOptions = {
    baseType: undefined,
    subType: null,
    children: null,
    modifierNames: [],
    attrs: {},
    tabOptions: {
        react: {
            show: true,
            label: 'React',
            hljs: 'html'
        },
        html: {
            show: true,
            defaultActive: true,
            label: 'HTML',
            hljs: 'html'
        },
        css: {
            show: true,
            label: 'CSS',
            hljs: 'css'
        },
        js: {
            show: false,
            label: 'JavaScript',
            hljs: 'js',
            code: ''
        }
    }
};

const getEnumValuesFromPropType = (propType) => {
    const enumObjects = propType.type.value;
    return enumObjects.map((enumObject) => (removeSpecialCharacters(enumObject.value)));
};

/* eslint-disable no-underscore-dangle */
const getTypeNameToUseForComponent = (component) => {
    const props = component.__docgenInfo.props;
    if (props[typeAttributeName]) {
        return typeAttributeName;
    }
    return inputTypeAttributeName;
};

const getTypeNamesOfComponent = (component) => {
    if (component.__docgenInfo && component.__docgenInfo.props) {
        const propType = component.__docgenInfo.props[getTypeNameToUseForComponent(component)];
        if (propType) {
            if (isEnum(propType.type)) {
                return getEnumValuesFromPropType(propType);
            }
        }
    }
    return [component.name];
};

const getModifiersOfComponent = (baseComponent, modifierNames) => {
    if (baseComponent.__docgenInfo && baseComponent.__docgenInfo.props) {
        const props = baseComponent.__docgenInfo.props;
        return modifierNames.map((modifierName) => ({ name: modifierName, value: props[modifierName] || null }));
    }
    return [];
};
/* eslint-enable no-underscore-dangle */

const sampleScript = (providedOpts) => {
    const opts = deepmerge(defaultOptions, providedOpts || {});
    if (opts.baseType) {
        const baseType = opts.baseType;
        const modifierNames = opts.modifierNames;
        const subType = opts.subType;
        const children = opts.children;
        const attrs = opts.attrs;
        const tabOptions = opts.tabOptions;

        const typeNamesOfComponent = getTypeNamesOfComponent(baseType);
        const modifiersOfComponent = getModifiersOfComponent(baseType, modifierNames);

        if (typeNamesOfComponent) {
            const sampleTypes = typeNamesOfComponent.map((typeName) => {
                const newAttrs = {};
                if (typeNamesOfComponent.length > 1) {
                    newAttrs[getTypeNameToUseForComponent(baseType)] = typeName;
                }
                const typeToRender = subType || baseType;
                return newType(typeToRender, toFirstUpper(typeName), children, Object.assign(newAttrs, attrs));
            });

            // eslint-disable-next-line array-callback-return, consistent-return
            const sampleModifiers = modifiersOfComponent.map((modifier) => {
                const propType = modifier.value;
                if (!propType || isBool(propType.type)) {
                    return newMultipleChoiceModifier(modifier.name, toFirstUpper(modifier.name));
                }
                return newMultipleChoiceModifier(metadata.defaultValues[modifier.name], toFirstUpper((modifier.name)));
            });

            return {
                tabOptions: { ...tabOptions },
                ...createSampleData(sampleTypes, sampleModifiers, baseType)
            };
        }
    }
    return null;
};

export default sampleScript;
