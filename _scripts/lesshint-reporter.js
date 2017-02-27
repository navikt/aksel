/* eslint-disable strict, no-param-reassign, object-shorthand, no-console */

'use strict';

const chalk = require('chalk');
const table = require('text-table');

const tableConfig = {
    align: ['l', ':', 'l', 'l']
};

function report(results) {
    const groupedResultsObject = results
        .reduce((acc, result) => {
            const group = acc[result.fullPath] || { fullPath: result.fullPath, results: [] };
            group.results.push(result);
            acc[result.fullPath] = group;
            return acc;
        }, {});

    const groupedResults = Object.keys(groupedResultsObject)
        .map((key) => ({ key: key, value: groupedResultsObject[key] }))
        .reduce((acc, entry) => {
            acc.push(entry.value);
            return acc;
        }, []);

    groupedResults.forEach((group) => {
        const filepath = group.fullPath;
        const NOF_ERRORS = group.results.filter((result) => result.severity === 'error').length;
        const NOF_WARNINGS = group.results.filter((result) => result.severity === 'warning').length;

        console.log(`${filepath} (${chalk.red(NOF_ERRORS)}/${chalk.yellow(NOF_WARNINGS)})`);
        const tableRows = group.results.map((result) => [
            result.severity === 'error' ? chalk.red(' X') : chalk.yellow(' O'),
            chalk.gray(`${result.line}:${result.column}`),
            result.message,
            chalk.gray(result.linter)
        ]);
        console.log(table(tableRows, tableConfig));
        console.log('');
    });
}

module.exports = {
    report: report
};
