import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';


module('Integration | Component | event-view', function(hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function(assert) {
        assert.expect(1);

        this.set('list', [
            {
                firstName: 'Tony',
                lastName: 'Stark',
                email: 'tony.stark@avengers.com',
                mobile: '00000000000'
            },
            {
                firstName: 'Steve',
                lastName: 'Rogers',
                email: 'steve.rogers@avengers.com',
                mobile: '11111111111'
            },
            {
                firstName: 'Peter',
                lastName: 'Parker',
                email: 'peter.parker@avengers.com',
                mobile: '222222222222'
            }
        ]);
        await render(hbs`{{infinite-scroll-list list=this.list}}`);
        assert.equal(this.element.querySelectorAll('li:not(.header-line)').length, 3, 'Rendered 3 lines as expected');
    });
});
