import { module, test } from 'qunit';
import { setupTest } from 'task1/tests/helpers';

module('Unit | Route | add-new-payment', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:add-new-payment');
    assert.ok(route);
  });
});
