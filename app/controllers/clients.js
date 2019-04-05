import Controller from '@ember/controller';
import { logger } from '../utils/global-utilities';
import { inject as service } from '@ember/service';


export default Controller.extend({
    editEvents: service(),
    isLoadingClients: false,

    init() {
        this._super(...arguments);
        this.itemHeaders = ['name', 'email', 'phone'];
    },

    actions: {
        loadMoreClients(page) {
            logger(`now loading page: ${page}`);
            this.set('isLoadingClients', true);

            return this.store.query('client', {page: page}).then((results)  => {
                this.set('isLoadingClients', false);
                this.set('paginationInfo', results.get('meta'));

                return {
                    clients: results
                };
            });
        },

        searchClient(query) {
            Object.entries(query).forEach(([key, value]) => {
                if (value.length === 0) {
                    delete query[key];
                }
            });

            if (Object.keys(query).length === 0) {
                logger('resetting clients list', 'success');
                this.set('model.clients', this.store.findAll('client'));
                return false;
            }

            this.set('isLoadingClients', true);
            logger('finding clients with query:');
            logger(query, 'object');
            let filteredClients = this.store.query('client', query);

            this.set('model.clients', filteredClients);
            filteredClients.then(() => {
                this.set('isLoadingClients', false);
            })
        },

        undoSearchClient() {
            this.set('model.clients', this.store.findAll('client'));
        }
    }
});
