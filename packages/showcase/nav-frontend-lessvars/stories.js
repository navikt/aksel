import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Palette from './palette';

storiesOf('Core', module)
    .add('Less variabler', () => (
        <Palette />
    ));
