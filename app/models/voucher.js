import DS from 'ember-data';


export default DS.Model.extend({
    issueDate: DS.attr('date'),
    expiryDate: DS.attr('date'),
    originalBalance: DS.attr('number'),
    remainingBalance: DS.attr('number'),
    serialNumber: DS.attr('string')
});
