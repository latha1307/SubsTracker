import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { subscriptionData } from '../data/subscriptionData';
export default class ViewHistory extends Component {
    @tracked subId = 0;
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
            this.subId = this.viewHistory.id;
            this.imgPath = this.viewHistory.imgPath;
            this.historyData = subscriptionData[this.subId - 1].paymentHistory.slice().reverse();
        }
        console.log(this.viewHistory)
        console.log(this.historyData)
        console.log(subscriptionData)
    }

}
