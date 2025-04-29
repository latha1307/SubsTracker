import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class ViewHistory extends Component {
    @tracked subName = '';
    @tracked imgPath = '';
    @tracked historyData = [];
    @tracked viewHistory = null; 
    @service router;
    columns = [
        { head: 'Bill Date', value: 'billDate'},
        { head: 'Subscription Plan', value: 'subPlan'},
        { head: 'Amount', value: 'amnt'},
        { head: 'Payment Method', value: 'payMethod'},
    ]

    constructor() {
        super(...arguments);
        this.viewHistory = this.args.viewHistory;
        if(this.viewHistory){
            this.subName = this.viewHistory.subName;
            this.imgPath = this.viewHistory.imgPath;
            this.historyData = this.viewHistory.paymentHistory;
        }
        console.log(this.subName)
        console.log(this.historyData)
    }

    @action
    back() {
        this.router.transitionTo('subscription')
    }
}
