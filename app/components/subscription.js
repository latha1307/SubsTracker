import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { subscriptionData } from '../data/subscriptionData';
import SubscriptionModel from '../models/subscription';
import { service } from '@ember/service';

export default class Subscription extends Component {
    @service subscription;

    @tracked subData = []
    activeSubCount = 0;
    inActiveSubCount = 0;
    amountSpent = 0;
    amountSaved = 0;

    
    constructor() {
        super(...arguments)
        this.loadData();
        this.updateStatus();
        this.updateAmount();
    }

    @action loadData() {
        this.subData = (subscriptionData ?? []).map((e) => new SubscriptionModel(e))
    }
    
    @action updateStatus() {
        for (let index = 0; index < this.subData.length; index++) {
            if (this.subData[index].status == 'Active' ) {
                this.activeSubCount += 1;
            }
            else{
                this.inActiveSubCount += 1;
            }
            
        }
    }

    getCurrentMonthYear() {
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${month}-${year}`;
      }
      
    @action
    currentStatus(val) {
        this.subscription.subscriptionStatus = val;
    }

    @action
    formatDate(inputDate) {
        const dateParts = inputDate.split('-');
        if (dateParts.length !== 3) {
          return "Invalid date format";
        }
      
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);
      
        if (isNaN(day) || isNaN(month) || isNaN(year) || day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999) {
          return "Invalid date values";
        }
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        return `${formattedMonth}-${year}`;
      }

    @action
    addSpentAmount(input) {
        this.amountSpent += Number(input);
    }

    @action
    addSavedAmount(input) {
        this.amountSaved += Number(input);
    }
      

    @action updateAmount() {
        for (let i = 0; i < this.subData.length; i++) {

            this.subData[i].paymentHistory.forEach(payData => {
                if (this.subData[i].status == 'Active' ){
                    if (this.formatDate(payData.billDate) == this.getCurrentMonthYear()){
                        this.addSpentAmount(payData.amnt)
                    }
                }
            });

            if(this.subData[i].status == 'Inactive'){
                this.addSavedAmount(this.subData[i].amount)
            }
        }
    }
}
