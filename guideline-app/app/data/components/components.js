import * as SampleData from './sample-data';
import * as TextData from './text-data';

export const components = (
    Object.keys(TextData).map((td) => ({
        ... TextData[td],
        sampleData: SampleData[td]
    }))
);