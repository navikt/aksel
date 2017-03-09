const cheerio = require('cheerio');
const fs = require('fs');

function readFile(src) {
    return Promise.resolve(fs.readFileSync(src, 'utf-8'));
}
function fix(content) {
    const $ = cheerio.load(content);

    $('head').append('    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n');
    return $.html();
}
function writeToFile(src) {
    return (content) => Promise.resolve(fs.writeFileSync(src, content, 'utf-8'));
}

readFile('./dist/index.html')
    .then(fix)
    .then(writeToFile('./dist/new.html'));
