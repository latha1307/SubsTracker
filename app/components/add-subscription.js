import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AddSubscription extends Component {
    @tracked selectedPlan = 'Standard';
    subPlans = [ 'Standard', 'Pro', 'Pro+'];

    @action
    changePlan(plan) {
        this.selectedPlan = plan;
    }
}
