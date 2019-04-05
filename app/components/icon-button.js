import Component from '@ember/component';


export default Component.extend({
    classNames: ['icon-button'],


    click() {
        this.onConfirm();
    }
});
