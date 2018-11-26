import '@babel/polyfill';
import './template';
import 'isomorphic-fetch';
import './css/index.css';

import task from './task';

import MainPage from './components/MainPage';

const mainPage = new MainPage(document.querySelector('#main-page'));

mainPage.onLoad();

console.log(task);
