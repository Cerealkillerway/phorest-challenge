import Route from '@ember/routing/route';


export default Route.extend({
    model() {
        return this.store.findAll('client').then((results)  => {
            return {
                clients: results
            };
        });
    }
});
