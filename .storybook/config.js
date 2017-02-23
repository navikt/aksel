import React from 'react';
import { configure, addDecorator } from '@kadira/storybook';

const req = require.context('./../packages/node_modules', true, /stories\.js$/);

addDecorator((story) => (
    <div style={{padding: '1rem'}}>{story()}</div>
));

function loadStories() {
    req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);