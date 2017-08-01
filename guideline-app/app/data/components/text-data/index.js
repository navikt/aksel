import { sanitizeHtml } from './../../../utils/dom/code-sampling.utils';

const mdReq = require.context("./", true, /([A-Z]|[a-z])+\.(accessibility|general|ingress|usage)\.(md)$/m);
let textDataRaw = {}, textDataInCategories = {};

mdReq.keys().forEach(function(key){
    textDataRaw[key] = mdReq(key);
});

Object.keys(textDataRaw).forEach((textDataKey) => {
    const pathSegments = textDataKey.split('/');
    const dirName = pathSegments[1];
    const fileName = pathSegments[2];
    const fileNameSegments = fileName.split('.');
    const textCategory = fileNameSegments[1];

    textDataInCategories[dirName] = {
        ... textDataInCategories[dirName],
        [textCategory]: sanitizeHtml(textDataRaw[textDataKey])
    };
});

export default textDataInCategories;