import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ViewSubscription extends Component {
    @service router;

    @tracked subName = '';
    @tracked imgPath = '';
    @tracked plan = '';
    @tracked billCycle = '';
    @tracked amount = '';
    @tracked category = '';
    @tracked pay = '';
    @tracked status = '';
    @tracked viewSub = null;
    @tracked isEdit = true;

    cycle=[ 'Monthly', '3-Months', 'Yearly'];
    plans=[ 'Basic', 'Individual', 'Family', 'Pro', 'Pro +', 'Premium', 'Standard', 'Professional', 'Starter']
    categories = ['Entertainment', 'Medical', 'Social Media', 'Education']
    statusOptions = ['Active', 'Inactive']

    constructor() {
        super(...arguments);
        this.viewSub = this.args.viewSub;
        if (this.viewSub) {
            this.subName= this.viewSub.subName;
            this.plan = this.viewSub.plan;
            this.amount = this.viewSub.amount;
            this.category = this.viewSub.category;
            this.billCycle = this.viewSub.billCycle;
            this.pay = this.viewSub.pay;
            this.imgPath = this.viewSub.imgPath;
            this.status = this.viewSub.status
        }
        console.log(this.viewSub)
    }

    setSubName= (e) => {
        this.subName = e.target.value; 
    }

    setAmount = (e) => {
        this.amount = e.target.value;
    }

    @action
    toggleEditing() {
        this.isEdit = !this.isEdit;
    }

    @action
    editSubmit(e) {
        e.preventDefault()
        this.viewSub.subName= this.subName;
        this.viewSub.plan = this.plan;
        this.viewSub.amount = this.amount;
        this.viewSub.category = this.category;
        this.viewSub.billCycle = this.billCycle;
        this.viewSub.pay = this.pay;
        this.viewSub.status = this.status;

        setTimeout(()=> {
            this.back();
        },2000)
    }

    @action
    back() {
        this.router.transitionTo('subscription')
    }
}
