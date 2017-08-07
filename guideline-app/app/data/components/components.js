import * as componentData from './sample-data';
import TextData from './text-data';

export const components = (
    Object.keys(TextData).map((td) => ({
        ... TextData[td],
        componentData: {
            ... componentData[td],
            componentName: td,
            __docgenInfo: componentData[td].base ? componentData[td].base.__docgenInfo : null,
            label: td.charAt(0).toUpperCase() + td.slice(1)
        }
    }))
);