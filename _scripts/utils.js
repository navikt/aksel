/* eslint-disable strict */

'use strict';

function capitalize(str) {
    return str && str[0].toUpperCase() + str.slice(1);
}
function camelcase(str) {
    return str && str.split(/\W/)
            .map(capitalize)
            .join('');
}
function kebabcase(str) {
    return str && str.split(/\W/)
            .join('-');
}
function entries(obj) {
    return Object.keys(obj)
        .map((key) => ({ key, value: obj[key] }));
}
function allCompleted(promises) {
    return new Promise((resolve, _reject) => {
        let unresolvedPromises = promises.length;
        const result = new Array(promises.length);
        promises
            .forEach((promise, index) => promise
                .then((res) => {
                    result[index] = res;
                    unresolvedPromises -= 1;
                })
                .catch((res) => {
                    result[index] = res;
                    unresolvedPromises -= 1;
                })
                .then(() => {
                    if (unresolvedPromises === 0) {
                        resolve(result);
                    }
                })
            );
    });
}
function parsetag(tagstring) {
    console.log('parsetag', tagstring);

    const regex = /^(.+)[-@]((?:\d+\.?){3})$/;
    const match = regex.exec(tagstring);
    if (!match) {
        throw new Error(`Tag did not conform to expected format: ${tagstring}`);
    }

    return { name: match[1], version: match[2] };
}
module.exports = {
    capitalize,
    camelcase,
    kebabcase,
    entries,
    allCompleted,
    parsetag
};
