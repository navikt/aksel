const inquirer = require('inquirer');
const glob = require('glob');
const fs = require('fs');
const mustache = require('mustache');
const copyfiles = require('copyfiles');

const questions = [
    {
        type: 'list',
        name: 'type',
        message: 'Pakketype?',
        choices: [ 'React', 'LESS' ]
    },
    {
        when: (ans) => ans.type === 'LESS',
        type: 'input',
        name: 'name',
        message: 'Navn?',
        validate: (val) => {
            if (val === '-design') return "Må gi ett navn";
            return true;
        },
        filter: (val) => {
            return `${val}-design`.toLowerCase();
        }
    },
    {
        when: (ans) => ans.type !== 'LESS',
        type: 'input',
        name: 'name',
        message: 'Navn?',
        validate: (val) => {
            if (!val || val.length === 0) return "Må gi ett navn";
            return true;
        },
        filter: (val) => {
            return `${val}`.toLowerCase();
        }
    },
    {
        type: 'confirm',
        name: 'confirmed',
        message: 'OK?'
    }
];

function handleAnswers(answers) {
    console.log('answers', answers);

    if (answers.confirmed) {
        return create(answers);
    } else {
        return inquirer.prompt(questions).then(handleAnswers);
    }
}

inquirer.prompt(questions).then(handleAnswers);

function create(answers) {
    const packageDist = `./packages/${answers.name}`;
    const packageDistGlob = `./packages/${answers.name}/**/*.*`;
    const packageSource = `./__meta/${answers.type.toLowerCase()}/**/*.*`;

    copyfiles([packageSource, packageDist], 2, function(){
        glob(packageDistGlob, (err, files) => {
            files.forEach((file) => {
                const template = fs.readFileSync(file, {encoding: 'UTF-8'});
                const content = mustache.render(template, answers);
                fs.writeFileSync(file, content, { encoding: 'UTF-8' });
            })
        });
    });
}