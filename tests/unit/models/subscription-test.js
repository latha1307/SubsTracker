import { setupTest } from 'task1/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | subscription', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('subscription', {});
    assert.ok(model, 'model exists');
  });
});
