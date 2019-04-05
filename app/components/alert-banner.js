import Component from '@ember/component';
import { computed } from '@ember/object'


export default Component.extend({
    typeClass: computed('type', function() {
        if (this.type === undefined) {
            return 'primary';
        }
        return this.type;
    })
});
