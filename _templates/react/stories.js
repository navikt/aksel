import React from 'react';
import { storiesOf } from '@kadira/storybook';
import <%name.camelcase%> from './src/index.js';

storiesOf('<%name.capitalize%>', module)
    .add('Default', () => (<<%name.camelcase%> />));