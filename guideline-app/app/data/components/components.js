import * as SampleData from './sample-data';
import TextData from './text-data';

export const components = (
    Object.keys(TextData).map((td) => ({
        ... TextData[td],
        sampleData: SampleData[td],
        componentName: td,
        label: td.charAt(0).toUpperCase() + td.slice(1)
    }))
);