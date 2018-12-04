import { apiKey, baseUrl, defaultLanguage }  from './constants';

function logAsyncCalls(obj) {
    const handler = {
        get(target, propKey, receiver) {
            const originalMethod = target[propKey];

            return function (...args) {
                return originalMethod.apply(this, args)
                    .then((data) => {
                        console.log(`${propKey} ${JSON.stringify(args)}  ->  `, data);
                        return data;
                    });
                
            };
        }
    };
    return new Proxy(obj, handler);
}

const services = {
    makeRequest: function({ endPoint = 'top-headlines', category, country, source, keyWord }, method) {
        let url;
        
        if(endPoint === 'sources') {
            url = `${baseUrl}/${endPoint}?apiKey=${apiKey}`;
        } else if (source) {
            url = `${baseUrl}/${endPoint}?sources=${source}&apiKey=${apiKey}`;
        } else {
            url = `${baseUrl}/${endPoint}?country=${country}&category=${category}&q=${keyWord}&language=${defaultLanguage}&apiKey=${apiKey}`;
        }   
    
        const request = new Request(url, { method })
         
        return new Promise((resolve, reject) => {
            fetch(request)
                .then((response) => response.json())
                .then((data) => {                               
                    data.status === 'ok' ? resolve(data) : reject(data.message);
                })
                .catch((message) => {                
                    import(/* webpackChunkName: "ErrorPopup" */ './components/ErrorPopup')
                        .then(module => {
                            const ErrorPopup = module.default;
                            ErrorPopup.show(message);   
                        });
                    
                    throw Error(message);            
                });
        });
    }
}

export default logAsyncCalls(services);
