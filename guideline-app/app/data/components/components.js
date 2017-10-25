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
