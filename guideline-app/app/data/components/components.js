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

const getInstallInstructions = (moduleRef, pkgs) => {
    let installInstructions = '';
    const modulePathMatch = (moduleRef.match(/\.\/nav-frontend-([A-Z]|[a-z]|-)+\//));
    if (modulePathMatch.index > -1) {
        const foundPackage = (pkgs[`${modulePathMatch[0]}package.json`]);
        if (foundPackage) {
            installInstructions =
                `npm install ${
                    [foundPackage.name]
                        .concat(
                            Object.keys(foundPackage.peerDependencies || {})
                        ).join(' ')} --save`;
        }
    }
    return installInstructions;
};

const getNameOfModule = (moduleRef) => {
    const regx = /\/_[a-z]+\./;
    const match = moduleRef.match(regx);
    if (match.index > -1) {
        // slices off /_ at the beginning and . at the end
        return match[0].slice(2, match[0].length - 1);
    }
    return null;
};

const getComponentData = () => {
    const sampleContext = require.context('../../../../packages/node_modules/', true, /_[a-z]+\.sample\.js/);
    const sampleModules = getModulesFromContext(sampleContext);
    const sampleRefs = Object.keys(sampleModules);
    const pkgContext = require.context('../../../../packages/node_modules/', true, /package\.json/);
    const pkgs = getModulesFromContext(pkgContext);

    const componentData = {};
    sampleRefs.forEach((moduleRef) => {
        const moduleName = getNameOfModule(moduleRef);
        if (moduleName) {
            componentData[moduleName] = {
                installInstructions: getInstallInstructions(moduleRef, pkgs),
                ...sampleModules[moduleRef].default
            };
        }
    });

    return componentData;
};

/* eslint-disable no-underscore-dangle */
const assignDisplayNameToComponentData = (componentData) => {
    const componentDataWithDisplayName = componentData;
    if (componentData.base && componentData.base.__docgenInfo) {
        componentDataWithDisplayName.base.displayName = componentDataWithDisplayName.base.__docgenInfo.displayName;
    } else if (componentData.component && componentData.component.__docgenInfo) {
        componentDataWithDisplayName.component.displayName = componentData.component.__docgenInfo.displayName;
    }

    if (componentData.types) {
        componentDataWithDisplayName.types = componentDataWithDisplayName.types.map((currentType) => {
            const updatedType = currentType;
            const children = currentType.children;
            if (currentType.component && currentType.component.__docgenInfo) {
                updatedType.component.displayName = currentType.component.__docgenInfo.displayName;
            }
            if (children && Array.isArray(children)) {
                updatedType.children = children.map((child) => (assignDisplayNameToComponentData(child)));
            }
            return updatedType;
        });
    }
    return componentDataWithDisplayName;
};

const assignDisplayNamesToComponents = (componentData) => {
    const componentDataWithDisplayNames = componentData;
    Object.keys(componentData).forEach((componentName) => {
        componentDataWithDisplayNames[componentName] = assignDisplayNameToComponentData(componentData[componentName]);
    });
    return componentDataWithDisplayNames;
};

const componentData = assignDisplayNamesToComponents(getComponentData());
const textDataInCategories = getTextData();

console.log(componentData);

const components = (
    Object.keys(componentData).map((td) => ({
        textData: textDataInCategories[td],
        componentData: {
            ...componentData[td],
            componentName: td,
            __docgenInfo: componentData[td].base ? componentData[td].base.__docgenInfo : null,
            label: td.charAt(0).toUpperCase() + td.slice(1)
        }
    }))
);
/* eslint-enable no-underscore-dangle */

export default components;
