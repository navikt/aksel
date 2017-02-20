"use strict";
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
        .map((key) => ({ key: key, value: obj[key] }));
}
function allCompleted(promises) {
    return new Promise((resolve, reject) => {
        let unresolvedPromises = promises.length;
        const result = new Array(promises.length);
        promises
            .forEach((promise, index) => promise
                .then((res) => {
                    result[index] = res;
                    unresolvedPromises--;
                })
                .catch((res) => {
                    result[index] = res;
                    unresolvedPromises--;
                })
                .then(() => {
                    if (unresolvedPromises === 0) {
                        resolve(result);
                    }
                })
            );
    });
}
module.exports = {
    capitalize,
    camelcase,
    kebabcase,
    entries,
    allCompleted
};