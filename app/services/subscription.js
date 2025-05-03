import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
//import { subscriptionData } from '../data/subscriptionData';
import { A } from '@ember/array';

export default class SubscriptionService extends Service {
    @tracked subscriptionStatus = 'All'
    @tracked subscriptionArray = JSON.parse(localStorage.getItem('subscriptionData')) || [];

    constructor() {
        super(...arguments);
    }

    @action 
    loadData() {
        this.subscriptionArray = A(this.subscriptionArray);
        localStorage.setItem('subscriptionData', JSON.stringify(this.subscriptionArray))
    }

}
