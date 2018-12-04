import services from '../../services';
import observer from '../Observer';

function getSources() {
    return services.makeRequest({ endPoint: 'sources' }, 'GET');
}

class SourcesModalModel {
    constructor() {
        this.data = {};
    }  
    
    setData = (data) => {
        this.data = data;

        observer.notify('SOURCES_UPDATED', this.data);
    }

    init = () => {
        return getSources()
        .then((data) => {
            this.setData(data);
        });
    }
}

export default SourcesModalModel;