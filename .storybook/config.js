import React from 'react';
import { configure } from '@storybook/react';

const moduleRequire = require.context('./../packages/node_modules', true, /development-sandbox\.js$/);

function loadStories() {
    moduleRequire.keys().forEach((filename) => moduleRequire(filename));
}

configure(loadStories, module);