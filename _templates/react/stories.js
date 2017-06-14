import React from 'react';
import { storiesOf } from '@storybook/react';
import { JSDokumentasjon } from './../../dokumentasjon';
import readme from './README.md';
import pkg from './package.json';
import <%name.camelcase%> from './src/<%name.indexfile%>';

storiesOf('<%name.capitalize%>', module)
    .addWithSections('Default', () => (
        <<%name.camelcase%> />
    ), JSDokumentasjon(pkg, readme, <%name.camelcase%>));
