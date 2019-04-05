import DS from 'ember-data';
import { dasherize } from '@ember/string';



export default DS.JSONAPISerializer.extend({
    normalizeResponse(store, primaryModelClass, payload/*, id, requestType*/) {
        let modelName = primaryModelClass.modelName;

        if (payload.content) {
            payload.data = payload.content;
            delete payload.content;

            if (payload.page) {
                payload.meta = payload.page
                delete payload.page;
            }

            for (let record of payload.data) {
                let recordId = record[`${modelName}Id`];

                delete record[`${modelName}Id`];
                record.attributes = {};

                for (let key in record) {
                    record.attributes[dasherize(key)] = record[key];
                }

                record.type = modelName;
                record.id = recordId;
            }
        }

        return this._super(...arguments);
    }
});
