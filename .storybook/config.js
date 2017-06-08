import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import sectionsAddon from 'react-storybook-addon-sections';

const showcaseRequire = require.context('./../packages/showcase', true, /stories\.js$/);
const moduleRequire = require.context('./../packages/node_modules', true, /stories\.js$/);

setAddon(sectionsAddon);
addDecorator((story) => (
    <div style={{padding: '1rem 1.5rem'}}>{story()}</div>
));

function loadStories() {
    showcaseRequire.keys().forEach((filename) => showcaseRequire(filename));
    moduleRequire.keys().forEach((filename) => moduleRequire(filename));
}

configure(loadStories, module);