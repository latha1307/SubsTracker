import { module, test } from 'qunit';
import { setupTest } from 'task1/tests/helpers';

module('Unit | Route | view-subscription', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:view-subscription');
    assert.ok(route);
  });
});
