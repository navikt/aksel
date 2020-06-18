/* eslint-disable */
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

const getDependencies = (pkgName, edges) => {
    return dfs(edges, pkgName);
};

const getDependencyEdgesFromPackages = (pkgs) => Object.values(pkgs)
        .map((pkg) => [pkg.name, Object.keys(pkg.peerDependencies || {})])
        .reduce((arr, [pkgName, pkgDependencies]) => (
            [...arr, ...pkgDependencies.map((dependency) => [pkgName, dependency])]
        ), []);

const getOverviewModulesByPackageName = (packageName, overviewModules) =>
    Object.keys(overviewModules).filter((overviewKey) => overviewKey.indexOf(`./${packageName}/`) !== -1);

const getOverviewModuleNameByPath = (path) => {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    return filename.substr(0, filename.length - 13); // minus length of '.overview.mdx'
};

const getComponentData = () => {
    // Require all the files we need to cross reference

    const pkgContext = require.context('NavFrontendModules', true, /package\.json/);
    const pkgs = getModulesFromContext(pkgContext);

    const overviewContext = require.context('NavFrontendModules', true, /\w+\.overview\.mdx/);
    const overviewModules = getModulesFromContext(overviewContext);

    const allModulesContext = require.context('NavFrontendModules', true, /doc\/[a-z-]+.js/);
    const allModules = getModulesFromContext(allModulesContext);

    // Find all package dependencies

    const edges = getDependencyEdgesFromPackages(pkgs);

    // Combine componentData

    const componentData = {};

    Object.keys(overviewModules).forEach((overviewKey) => {
        const overviewModuleName = getOverviewModuleNameByPath(overviewKey);
        const pkgName = overviewKey.split('/')[1];
        const pkg = pkgs[`./${pkgName}/package.json`];
        const pkgMainModulePath = pkg.main.replace('lib', 'doc');
        const pkgOverviewModules = getOverviewModulesByPackageName(pkgName, overviewModules);

        let mainModule;
        let mainModuleKey = `./${pkgName}/${pkgMainModulePath}`;
        const pkgModules = allModules[mainModuleKey];

        if (pkgOverviewModules.length > 1) {
            // If package has multiple overview modules (i.e. 'nav-frontend-skjema'),
            // use overview module name to find main module
            mainModuleKey = Object.keys(pkgModules).find((moduleKey) =>
                moduleKey.toLowerCase() === overviewModuleName.toLowerCase());

            mainModule = pkgModules[mainModuleKey];
        } else {
            // All others
            mainModule = (pkgModules) ? allModules[mainModuleKey]['default'] : undefined;
        }

        componentData[overviewModuleName] = {
            name: overviewModuleName,
            mainModule,
            packageModules: pkgModules,
            manifest: pkg,
            dependencies: getDependencies(pkgName, edges)
        };
    });

    return componentData;
};

const componentData = getComponentData();
const textDataInCategories = getTextData();

const components = (
    Object.keys(componentData).map((componentName) => ({
        textData: textDataInCategories[componentName.toLowerCase()],
        componentData: { ...componentData[componentName] }
    }))
);

export default components;
