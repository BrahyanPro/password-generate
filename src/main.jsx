import React from 'react';
import ReactDOM from 'react-dom';
import 'terminal.css';
import './assets/css/index.css';
import { GenerateApp } from './app';

ReactDOM.render(
  <React.StrictMode>
    <GenerateApp />
  </React.StrictMode>,
  document.getElementById('app')
);
