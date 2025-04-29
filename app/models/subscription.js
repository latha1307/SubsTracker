
import { tracked } from '@glimmer/tracking';

export default class SubscriptionModel {
    @tracked subName;
    @tracked id;
    @tracked plan;
    @tracked availablePlan;
    @tracked periods;
    @tracked amount;
    @tracked category;
    @tracked description;
    @tracked status;
    @tracked imgPath;
    @tracked Pay;
    @tracked paymentHistory;

    constructor(data){
        Object.assign(this, data)
    }
}
