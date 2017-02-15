const typeQuestion = {
    type: 'list',
    name: 'type',
    message: 'Template: ',
    choices: ['react', 'less'],
    validate: (val) => val ? true : 'Must be defined'
};
const nameQuestion = (type, filter, validate) => ({
    type: 'input',
    name: 'name',
    message: 'Name: ',
    when: (ans) => ans.type === type,
    filter: (val) => {
        return filter(val).toLowerCase()
    },
    validate: (val) => {
        if (fs.existsSync(`./packages/node_modules/${val}`.toLowerCase())) {
            return "Package already exists."
        }
        return validate(val);
    }
});
const reactNameQuestion = nameQuestion(
    'react',
    (val) => val,
    (val) => val ? true : 'Must be defined'
);
const lessNameQuestion = nameQuestion(
    'less',
    (val) => {
        if (val.endsWith('-style')) return val;
        return `${val}-style`
    },
    (val) => val !== '-style' ? true : 'Must be defined'
);
const okQuestion = {
    type: 'confirm',
    name: 'ok',
    message: 'OK? '
};

module.exports = [typeQuestion, reactNameQuestion, lessNameQuestion, okQuestion];