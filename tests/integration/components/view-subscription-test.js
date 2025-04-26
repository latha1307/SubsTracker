import { module, test } from 'qunit';
import { setupRenderingTest } from 'task1/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | view-subscription', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<ViewSubscription />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <ViewSubscription>
        template block text
      </ViewSubscription>
    `);

    assert.dom().hasText('template block text');
  });
});
