import { module, test } from 'qunit';
import { setupRenderingTest } from 'task1/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | add-new-payment', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<AddNewPayment />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <AddNewPayment>
        template block text
      </AddNewPayment>
    `);

    assert.dom().hasText('template block text');
  });
});
