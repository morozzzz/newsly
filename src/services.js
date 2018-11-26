import { apiKey, baseUrl, defaultLanguage }  from './constants';

const getData = ({ endPoint = 'top-headlines', category, country, source, keyWord }) => {
    let url;
    
    if(endPoint === 'sources') {
        url = `${baseUrl}/${endPoint}?apiKey=${apiKey}`;
    } else if (source) {
        url = `${baseUrl}/${endPoint}?sources=${source}&apiKey=${apiKey}`;
    } else {
        url = `${baseUrl}/${endPoint}?country=${country}&category=${category}&q=${keyWord}&language=${defaultLanguage}&apiKey=${apiKey}`;
    }   
     
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {                
                data.status === 'ok' ? resolve(data) : reject(data.message);
            })
            .catch((message) => {
                throw Error(message);             
            });
    });
};


export default getData;
