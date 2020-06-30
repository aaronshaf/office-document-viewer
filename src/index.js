import React from 'react';
import ReactDOM from 'react-dom';
import theme from '@instructure/canvas-theme';
import highContrastTheme from '@instructure/canvas-high-contrast-theme';
import App from './App';
import { RecoilRoot } from 'recoil';
import * as serviceWorker from './serviceWorker';
import './reset.css';
import './index.css';

// TODO
const highContrastEnabled = false;

if (highContrastEnabled) {
  highContrastTheme.use();
  // import('./high-contrast.css');
} else {
  theme.use();
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
