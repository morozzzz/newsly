const countries = {
    Argentina: 'ar', 
    Australia: 'au',
    Austria: 'at',
    Belgium: 'be',
    Bulgaria: 'bg',
    Brazil: 'br',
    Canada: 'ca',
    China: 'cn',
    Colombia: 'co',
    Cuba: 'cu',
    'Czech Republic': 'cz',
    Germany: 'de',
    Egypt: 'eg',
    France: 'fr',
    'United Kingdom': 'gb',
    Greece: 'gr',
    'Hong Kong': 'hk',
    Hungary: 'hu',
    Indonesia: 'id',
    Ireland: 'ie',
    Israel: 'il',
    India: 'in',
    Italy: 'it',
    Japan: 'jp',
    Korea: 'kr',
    Lithuania: 'lt',
    Latvia: 'lv',
    Morocco: 'ma',
    Mexico: 'mx',
    Malaysia: 'my',
    Nigeria: 'ng',
    Netherlands: 'nl',
    Norway: 'no',
    'New Zealand': 'nz',
    Philippines: 'ph',
    Poland: 'pl',
    Portugal: 'pt',
    Romania: 'ro',
    Serbia: 'rs',
    Russia: 'ru',
};

const categories = {
    Business: 'business',
    Entertainment: 'entertainment',
    General: 'general',
    Health: 'health',
    Science: 'science',
    Sports: 'sports',
    Technology: 'technology'
};

const apiKey = '8451785d44d5442ba1501e02b76f1057';
const baseUrl = 'https://newsapi.org/v2';
const defaultLanguage = 'en';
const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export {
    countries,
    categories,
    apiKey,
    baseUrl,
    defaultLanguage,
    dateOptions
};
