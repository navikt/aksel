import * as componentData from './sample-data';
import TextData from './text-data';

const components = (
    Object.keys(componentData).map((td) => ({
        textData: TextData[td],
        componentData: {
            ...componentData[td],
            componentName: td,
            __docgenInfo: componentData[td].base ? componentData[td].base.__docgenInfo : null, // eslint-disable-line no-underscore-dangle, max-len
            label: td.charAt(0).toUpperCase() + td.slice(1)
        }
    }))
);

export default components;
