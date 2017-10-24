import { sanitizeHtml } from './../../utils/dom/code-sampling.utils';

const getModulesFromContext = (context) => {
    const modules = {};
    context.keys().forEach((moduleRef) => {
        modules[moduleRef] = context(moduleRef);
    });
    return modules;
};

const getTextData = () => {
    const context = require.context(
        '../../../../packages/node_modules/',
        true,
        /([A-Z]|[a-z])+\.(accessibility|ingress|usage)\.(md)/
    );
    const textDataRaw = getModulesFromContext(context);
    const textDataInCategories = {};

    Object.keys(textDataRaw).forEach((textDataKey) => {
        const pathSegments = textDataKey.split('/');
        const fileName = pathSegments[pathSegments.length - 1];
        const fileNameSegments = fileName.split('.');

        // lowercase everything for +1 error-proneness
        const componentName = fileNameSegments[0].toLowerCase();
        const textCategory = fileNameSegments[1].toLowerCase();

        textDataInCategories[componentName] = {
            ...textDataInCategories[componentName],
            [textCategory]: sanitizeHtml(textDataRaw[textDataKey])
        };
    });

    return textDataInCategories;
};

const getComponentData = () => {
    const getNameOfModule = (moduleRef) => {
        const regx = /\/_[a-z]+\./;
        const match = moduleRef.match(regx);
        if (match.index > -1) {
            // slices off /_ at the beginning and . at the end
            return match[0].slice(2, match[0].length - 1);
        }
        return null;
    };

    const context = require.context(
        '../../../../packages/node_modules/',
        true,
        /_[a-z]+\.sample\.js/
    );
    const modules = getModulesFromContext(context);
    const componentData = {};
    Object.keys(modules).forEach((moduleRef) => {
        const moduleName = getNameOfModule(moduleRef);
        if (moduleName) {
            componentData[moduleName] = modules[moduleRef].default;
        }
    });

    return componentData;
};

const componentData = getComponentData();
const textDataInCategories = getTextData();
const components = (
    Object.keys(componentData).map((td) => ({
        textData: textDataInCategories[td],
        componentData: {
            ...componentData[td],
            componentName: td,
            // eslint-disable-next-line no-underscore-dangle
            __docgenInfo: componentData[td].base ? componentData[td].base.__docgenInfo : null,
            label: td.charAt(0).toUpperCase() + td.slice(1)
        }
    }))
);

export default components;
