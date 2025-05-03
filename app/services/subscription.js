import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
//import { subscriptionData } from '../data/subscriptionData';

export default class SubscriptionService extends Service {
    @tracked subscriptionStatus = 'All'
    @tracked subscriptionArray = JSON.parse(localStorage.getItem('subscriptionData')) || [];

    constructor() {
        super(...arguments);
        this.loadData();
    }

    @action 
    loadData() {
        this.subscriptionArray = this.subscriptionArray;
        localStorage.setItem('subscriptionData', JSON.stringify(this.subscriptionArray))
    }

}
