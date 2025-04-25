
import { tracked } from '@glimmer/tracking';

export default class Subscription {
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

    constructor(data){
        Object.assign(this, data)
    }
}
