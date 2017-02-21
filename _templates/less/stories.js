import React from 'react';
import { storiesOf } from '@kadira/storybook';
import './src/index.less';

storiesOf('<%name.capitalize%>', module)
    .add('Default', () => (
        <div className="<%name.cssname%>">
            <p>Your markup here</p>
        </div>
    ));
