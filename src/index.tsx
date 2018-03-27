import React from 'react';
import { render } from 'react-dom';
import { LocaleProvider } from 'antd';
import locale from 'antd/lib/locale-provider/cs_CZ';

import App from './components/App';

const Main = () => (
    <LocaleProvider locale={locale}>
        <App message="world" />
    </LocaleProvider>
);

render(<Main />, document.getElementById('app'));
