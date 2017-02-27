import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';

const showcaseRequire = require.context('./../packages/showcase', true, /stories\.js$/);
const moduleRequire = require.context('./../packages/node_modules', true, /stories\.js$/);

addDecorator((story) => (
    <div style={{padding: '1rem'}}>{story()}</div>
));

function loadStories() {
    showcaseRequire.keys().forEach((filename) => showcaseRequire(filename));
    moduleRequire.keys().forEach((filename) => moduleRequire(filename));
}

configure(loadStories, module);