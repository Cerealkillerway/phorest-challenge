import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { logger } from '../../utils/global-utilities';


export default Component.extend({
    classNames: ['row', 'client-item'],
    editEvents: service(),

    click() {
        logger(`activating create-voucher form for ${this.item.firstName} ${this.item.lastName} (${this.item.id})`),
        this.editEvents.openEditor(this.item);
    }
});
