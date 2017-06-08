import React from 'react';
import { storiesOf } from '@storybook/react';
import Palette from './palette';

storiesOf('Core', module)
    .add('Less variabler', () => (
        <Palette />
    ));
