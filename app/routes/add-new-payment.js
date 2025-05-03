import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AddNewPaymentRoute extends Route {
    @service subscription;

    model(params) {
        const subId = params.id;
        return this.subscription.subscriptionArray.find((sub) => sub.id === Number(subId));
    }
}
