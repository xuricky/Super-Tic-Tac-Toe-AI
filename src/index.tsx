import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Test } from './components/test';

ReactDOM.render(
    <Test compiler='TypeScript' framework='React' />,
    document.getElementById('example')
);