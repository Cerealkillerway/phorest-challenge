import DS from 'ember-data';


export default DS.Model.extend({
    version: DS.attr('number'),
    firstName: DS.attr('string'),
    lastName: DS.attr('string'),
    landLine: DS.attr('string'),
    email: DS.attr('string'),
    mobile: DS.attr('string'),
    address: DS.attr(),
    clientSince: DS.attr('date'),
    gender: DS.attr('string'),
    notes: DS.attr('string'),
    smsMarketingConsent: DS.attr('boolean'),
    emailMarketingConsent: DS.attr('boolean'),
    smsReminderConsent: DS.attr('boolean'),
    emailReminderConsent: DS.attr('boolean'),
    preferredStaffId: DS.attr('string'),
    creditAccount: DS.attr(),
    creatingBranchId: DS.attr('string'),
    archived: DS.attr('boolean'),
    banned: DS.attr('boolean')
});
