import dfs from 'depth-first';

const getModulesFromContext = (context) => {
    const modules = {};
    context.keys().forEach((moduleRef) => {
        modules[moduleRef] = context(moduleRef);
    });
    return modules;
};

const getTextData = () => {
    const textDataContext = require.context('NavFrontendModules', true, /(\w+)\.(\w+)\.(mdx?)/);
    const textDataRaw = getModulesFromContext(textDataContext);

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

const getInstallInstructionsAlt = (pkgName, edges) => {
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

const getDependencyEdgesFromPackages = (pkgs) => {
    return Object.values(pkgs)
        .map((pkg) => [pkg.name, Object.keys(pkg.peerDependencies || {})])
        .reduce((arr, [pkgName, pkgDependencies]) => (
            [...arr, ...pkgDependencies.map((dependency) => [pkgName, dependency])]
        ), []);
};

const getOverviewModulesByPackageName = (packageName, overviewModules) => {
    return Object.keys(overviewModules).filter((overviewKey) => {
        return overviewKey.indexOf(`./${packageName}/`) !== -1
    });
};

const getModulesByPackageName = (packageName, allModules) => {
    // return Object.keys(allModules).filter();
};

const getComponentModules = () => {

};

const getOverviewModuleNameByPath = (path) => {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    return filename.substr(0, filename.length - 13); // minus length of '.overview.mdx'
}

const getComponentData = () => {

    // TODO: remove

    const sampleContext = require.context('NavFrontendModules', true, /_[a-z]+\.sample\.js/);
    const sampleModules = getModulesFromContext(sampleContext);
    const sampleRefs = Object.keys(sampleModules);

    // console.log('sampleModules', sampleModules);

    // Find all package.json files under 'NavFrontendModules'

    const pkgContext = require.context('NavFrontendModules', true, /package\.json/);
    const pkgs = getModulesFromContext(pkgContext);

    // console.log('packages', pkgs);

    // Find all modules that have an associated *.overview.mdx file

    const overviewContext = require.context('NavFrontendModules', true, /\w+\.overview\.mdx/);
    const overviewModules = getModulesFromContext(overviewContext);

    // console.log('overviewModules', overviewModules);

    // Find all modules

    const allModulesContext = require.context('NavFrontendModules', true, /lib\/[a-z-]+.js/);
    const allModules = getModulesFromContext(allModulesContext);

    // console.log('all modules', allModules);

    // Find dependencies

    const edges = getDependencyEdgesFromPackages(pkgs);

    // Combine componentData

    let componentData = {};
    let componentDataAlt = {};

    Object.keys(overviewModules).forEach((overviewKey) => {
        const overviewModuleName = getOverviewModuleNameByPath(overviewKey);
        const overviewModule = overviewModules[overviewKey];
        const pkgName = overviewKey.split('/')[1];
        const pkg = pkgs[`./${pkgName}/package.json`];
        const pkgMainModulePath = pkg['main'];
        const pkgOverviewModules = getOverviewModulesByPackageName(pkgName, overviewModules);
        let mainModuleKey = `./${pkgName}/${pkgMainModulePath}`;
        const pkgModules = allModules[mainModuleKey];

        let mainModule;
        if (pkgOverviewModules.length > 1) {
            // If package has multiple overview modules (i.e. 'nav-frontend-skjema'), 
            // use overview module name to find main module
            mainModuleKey = Object.keys(pkgModules).find(moduleKey => moduleKey.toLowerCase() === overviewModuleName.toLowerCase());
            mainModule = pkgModules[mainModuleKey];
        } else {
            // All others
            mainModule = allModules[mainModuleKey].default;
        }

        componentDataAlt[overviewModuleName] = {
            name: overviewModuleName,
            mainModule,
            packageModules: pkgModules,
            manifest: pkg,
            installInstructions: getInstallInstructionsAlt(pkgName, edges)
        };
    });

    // TODO: remove
    
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

    console.log(componentDataAlt);
    console.log(componentData);

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
