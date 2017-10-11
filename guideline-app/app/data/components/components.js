import TextData from './text-data';

const getModules = () => {
    const context = require.context('../../../../packages/node_modules/', true, /_[a-z]+\.sample\.js/);
    const modules = {};
    context.keys().forEach((moduleRef) => {
        modules[moduleRef] = context(moduleRef);
    });
    return modules;
};

const getNameOfModule = (moduleRef) => {
    const regx = /\/_[a-z]+\./;
    const match = moduleRef.match(regx);
    if (match.index > -1) {
        // slices off /_ and .
        return match[0].slice(2, match[0].length - 1);
    }
    return null;
};

const modules = getModules();
const componentData = {};
Object.keys(modules).forEach((moduleRef) => {
    const moduleName = getNameOfModule(moduleRef);
    if (moduleName) {
        componentData[moduleName] = modules[moduleRef].default;
    }
});

const components = (
    Object.keys(componentData).map((td) => ({
        textData: TextData[td],
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
