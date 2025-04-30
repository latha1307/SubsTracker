import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { subscriptionData } from '../data/subscriptionData';
import { service } from '@ember/service';
import SubscriptionModel from '../models/subscription';
import { walletHistory } from '../data/walletHistory';

export default class AddNewPayment extends Component {
    @service router;
    @service wallet;

    @tracked subName = '';
    @tracked subData = [];
    @tracked imgPath = '';
    @tracked subId = 0;
    @tracked imgPath = '';
    @tracked plan = '';
    @tracked billCycle = '';
    @tracked amount = '';
    @tracked category = '';
    @tracked pay = '';
    @tracked status = '';
    @tracked addPay = null; 
    @tracked billDate = new Date();

    
    cycle=[ 'Monthly', '3-Months', 'Yearly'];
    plans=[ 'Basic', 'Individual', 'Family', 'Pro', 'Pro +', 'Premium', 'Standard', 'Professional', 'Starter']
    categories = ['Entertainment', 'Medical', 'Social Media', 'Education']
    paymentMethods = ['card', 'UPI', 'Net-Banking', 'Wallet']
    constructor() {
        super(...arguments);
        this.loadData();
        this.addPay = this.args.addPay;
        if(this.addPay){
            this.subName = this.addPay.subName;
            this.subId = this.addPay.id;
            this.imgPath = this.addPay.imgPath;
            this.plan = this.addPay.plan;
            this.amount = this.addPay.amount;
            this.category = this.addPay.category;
            this.billCycle = this.addPay.billCycle;
            this.pay = this.addPay.Pay;
            this.status = this.addPay.status;
        }
    }

    @action loadData() {
        this.subData = (subscriptionData ?? []).map((e) => new SubscriptionModel(e))
    }

    setSubName= (e) => {
        this.subName = e.target.value; 
    }

    setAmount = (e) => {
        this.amount = e.target.value;
    }

    setBillDate = (e) => {
        this.billDate = e.target.value;
    }

    formatDate(date) {
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
      }

    @action
    async addNewPay(e) {
        e.preventDefault();
        if (this.pay == 'Wallet') {
            this.deductFromWallet();
        }
        await this.subData[this.subId].paymentHistory.push({
            billDate: this.formatDate(this.billDate),
            subPlan: this.plan,
            amnt: this.amount,
            payMethod: this.pay
        })
        console.log('updated history', this.subData)
        this.router.transitionTo('view-history', this.subId)
    }

    @action
    deductFromWallet() {
        this.wallet.debitAmount(this.amount)
        this.initWallet(this.amount)
    }

    getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
      }

    @action
    initWallet(amnt) {
        walletHistory.push({
            id: walletHistory.length + 1,
            date: this.getCurrentDate(),
            name: this.subName,
            imgPath: this.imgPath,
            statement: 'Paid',
            sent: true,
            method: 'debit',
            amount: amnt
        })
        console.log(walletHistory)
    }

}
