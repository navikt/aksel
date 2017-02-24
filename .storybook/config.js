import { configure } from '@kadira/storybook';

const showcaseRequire = require.context('./../packages/showcase', true, /stories\.js$/);
const moduleRequire = require.context('./../packages/node_modules', true, /stories\.js$/);

function loadStories() {
    showcaseRequire.keys().forEach((filename) => showcaseRequire(filename));
    moduleRequire.keys().forEach((filename) => moduleRequire(filename));
}

configure(loadStories, module);