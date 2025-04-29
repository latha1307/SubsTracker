import Route from '@ember/routing/route';
import { subscriptionData } from '../data/subscriptionData';

export default class AddNewPaymentRoute extends Route {
        model(params) {
        const subId = params.id;
        return subscriptionData.find((sub) => sub.id === Number(subId));
    }
}
