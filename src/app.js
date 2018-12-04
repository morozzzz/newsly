import '@babel/polyfill';
import './template';
import 'isomorphic-fetch';
import './css/index.css';

import MainPageController from './components/mainPage/MainPage.Controller';
import CategorySelectorController from './components/categorySelector/CategorySelector.Controller';
import CountrySelectorController from './components/countrySelector/CountrySelector.Controller';
import NewsListController from './components/newsList/NewsList.Controller';
import SourcesModalController from './components/sourcesModal/SourcesModal.Controller';
import OptionsContainerController from './components/optionsContainer/OptionsContainer.Controller';

const mainPageController = new MainPageController();
const categorySelectorController = new CategorySelectorController();
const countrySelectorController = new CountrySelectorController();
const newsListController = new NewsListController();
const sourcesModalController = new SourcesModalController();
const optionsContainerController = new OptionsContainerController();

newsListController.init();
mainPageController.init();
categorySelectorController.init();
countrySelectorController.init();
sourcesModalController.init();
optionsContainerController.init();