import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { JSDokumentasjon } from './../../dokumentasjon';
import readme from './README.md';
import pkg from './package.json';
import <%name.camelcase%> from './src/index';

storiesOf('<%name.capitalize%>', module)
    .addWithSections('Default', () => (
        <<%name.camelcase%> />
    ), JSDokumentasjon(pkg, readme, <%name.camelcase%>));
