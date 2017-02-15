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
module.exports = {
    capitalize,
    camelcase,
    kebabcase,
    entries
};