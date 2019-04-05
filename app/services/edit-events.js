import Service, { inject as service } from '@ember/service';
import $ from 'jquery';
import moment from 'moment';


export default Service.extend({
    store: service(),
    showAlert: false,

    closeEditor() {
        $('.quake-console').slideUp(200);
    },

    openEditor(item) {
        this.set('currentClient', item);
        $('.quake-console').slideDown(300);
    },

    resetVoucherForm() {
        let today = moment().format('YYYY-MM-DD');

        $('#voucher-issue-date').val(today);
        $('#voucher-expiry-date').val(today);
        $('#voucher-amount').val(0);
    },

    createVoucherRecord(data) {
        data.clientId = this.currentClient.id;

        let voucher = this.store.createRecord('voucher', data);

        voucher.save().then((/*record*/) => {
            this.set('alertMessage', 'Your voucher has been succesfully created...');
            this.set('alertType', 'success');
            this.set('showAlert', true);

            setTimeout(() => {
                this.set('showAlert', false);
            }, 3000);
        })
        .catch((/*reason*/) => {
            this.set('alertMessage', 'An error occurred while creating the voucher... Please try again');
            this.set('alertType', 'danger');
            this.set('showAlert', true);

            setTimeout(() => {
                this.set('showAlert', false);
            }, 3000);
        });
        this.resetVoucherForm();
        this.closeEditor();
    }
});
