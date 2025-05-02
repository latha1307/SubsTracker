import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { subscriptionData } from '../data/subscriptionData';
import SubscriptionModel from '../models/subscription';
import { service } from '@ember/service';
import PaymentHistoryModel from '../models/payment-history';
import { suggestData } from '../data/suggestedSub';

export default class AddSubscription extends Component {
    @service router;
    @tracked subData = [];
    @tracked payHistory = [];
    @tracked cycle=[ 'Seconds', 'Minutes', 'Monthly', '3-Months', 'Yearly'];
    @tracked plans=[ 'Basic', 'Individual', 'Family', 'Pro', 'Pro +', 'Premium', 'Standard', 'Professional', 'Starter']
    categories = ['Entertainment', 'Medical', 'Social Media', 'Education']
    paymentMethods = ['Card', 'UPI', 'Net-Banking', 'Wallet']
    @tracked subName = '';
    @tracked imgPath = '';
    @tracked plan = 'Select Plan';
    @tracked billCycle = 'Select Period';
    @tracked amount = '';
    @tracked category = 'Select Category';
    @tracked pay = 'Select Payment Method';
    @tracked showDescription = false;

    constructor() {
        super(...arguments)
        this.loadData();
        console.log(this.subData)
    }

    setSubName= (e) => {
        this.subName = e.target.value; 
    }

    setAmount = (e) => {
        this.amount = e.target.value;
    }

    setShowDescription = () => {
        this.showDescription = !this.showDescription;
        console.log(this.showDescription)
        console.log('worked')
    }

    @action loadData() {
        this.subData = (suggestData ?? []).map((e) => new SubscriptionModel(e))
    }

    @action feedData(item) {
        this.subName = item.subName;
        this.plans = item.availablePlan; 
        this.category = item.category;
        this.cycle = item.periods;
        this.imgPath = item.imgPath;
    }

    @action
    async addSubscription(e) {
        e.preventDefault()
            subscriptionData.push({
                id: subscriptionData.length + 1,
                subName: this.subName,
                plan: this.plan,
                billCycle: this.billCycle,
                amount: this.amount,
                category: this.category,
                Pay: this.pay,
                status: 'Active',
                imgPath: this.imgPath,
                isActive: true,
                paymentHistory: []
            })
        this.resetForm()
        console.log(subscriptionData)
        this.loadData()

        this.router.transitionTo('subscription')

    }

    resetForm() {
        this.subName = '';
        this.plan = 'Select Plan',
        this.billCycle = 'Select Period',
        this.amount = '',
        this.category = 'Select Category',
        this.pay = 'Select Payment Method'
    }
    @action
    back() {
        this.router.transitionTo('');
    }

}
