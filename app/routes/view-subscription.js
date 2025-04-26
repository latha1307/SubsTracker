import Route from '@ember/routing/route';
import { subscriptionData } from '../data/subscriptionData'

export default class ViewSubscriptionRoute extends Route {
    model(params) {
        const subId = params.id;
        console.log(subId)
        console.log()
        return subscriptionData.find((sub) => sub.id === Number(subId));
    }
}
