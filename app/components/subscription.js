import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { subscriptionData } from '../data/subscriptionData';
import SubscriptionModel from '../models/subscription';

export default class Subscription extends Component {
    @tracked subData = []

    
    constructor() {
        super(...arguments)
        this.loadData();
        console.log(this.subData)
    }

    @action loadData() {
        this.subData = (subscriptionData ?? []).map((e) => new SubscriptionModel(e))
    }
    
}
