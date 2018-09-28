import dfs from 'depth-first';

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
        /(\w+)\.(\w+)\.(mdx?)/
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
            [textCategory]: textDataRaw[textDataKey]
        };
    });

    return textDataInCategories;
};

const getInstallInstructions = (moduleRef, edges) => {
    const modulePathMatch = (moduleRef.match(/\.\/(nav-frontend-([A-Z]|[a-z]|-)+)\//));
    const pkgName = modulePathMatch[1];

    const dependencies = dfs(edges, pkgName).join(' ');
    return `npm install ${dependencies} --save`;
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

    const overviewContext = require.context('../../../../packages/node_modules/', true, /_[a-z]+\.overview\.js/);
    const overviewModules = getModulesFromContext(overviewContext);

    const sampleRefs = Object.keys(sampleModules);
    const pkgContext = require.context('../../../../packages/node_modules/', true, /package\.json/);
    const pkgs = getModulesFromContext(pkgContext);

    // console.log(pkgs);

    const edges = Object.values(pkgs)
        .map((pkg) => [pkg.name, Object.keys(pkg.peerDependencies || {})])
        .reduce((arr, [pkgName, pkgDependencies]) => (
            [...arr, ...pkgDependencies.map((dependency) => [pkgName, dependency])]
        ), []);

    let componentData = {};
    sampleRefs.forEach((moduleRef) => {
        const moduleName = getNameOfModule(moduleRef);
        if (moduleName) {
            componentData[moduleName] = {
                installInstructions: getInstallInstructions(moduleRef, edges),
                ...sampleModules[moduleRef].default
            };
        }
    });

    Object.keys(componentData).forEach((component) => {
        const packageName = componentData[component].installInstructions.match(/(npm install )((nav-frontend-)([a-z-]+))/)[2];
        const pkgsKey = Object.keys(pkgs).find((pkg) => pkgs[pkg].name === packageName);
        const manifest = pkgs[pkgsKey];
        componentData[component].pkg = manifest;
    });

    return componentData;
};

/* eslint-disable no-underscore-dangle */

const componentData = getComponentData();
const textDataInCategories = getTextData();

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
