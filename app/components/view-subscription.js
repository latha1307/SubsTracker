import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { subscriptionData } from '../data/subscriptionData';
import { walletHistory } from '../data/walletHistory';

export default class ViewSubscription extends Component {
    @service router;
    @service wallet;

    @tracked subName = '';
    @tracked subId = 0;
    @tracked imgPath = '';
    @tracked plan = '';
    @tracked billCycle = '';
    @tracked amount = '';
    @tracked category = '';
    @tracked pay = '';
    @tracked status = '';
    @tracked viewSub = null;
    @tracked isEdit = true;
    @tracked currentSubscription = false;
    @tracked durationCycle = 0;

    cycle=[ 'Seconds', 'Minutes', 'Days', 'Monthly', '3-Months', 'Yearly'];
    plans=[ 'Basic', 'Individual', 'Family', 'Pro', 'Pro +', 'Premium', 'Standard', 'Professional', 'Starter']
    categories = ['Entertainment', 'Medical', 'Social Media', 'Education']
    statusOptions = ['Active', 'Inactive']

    constructor() {
        super(...arguments);
        this.viewSub = this.args.viewSub;
        if (this.viewSub) {
            this.subName= this.viewSub.subName;
            this.subId= this.viewSub.id;
            this.plan = this.viewSub.plan;
            this.amount = this.viewSub.amount;
            this.category = this.viewSub.category;
            this.billCycle = this.viewSub.billCycle;
            this.pay = this.viewSub.pay;
            this.imgPath = this.viewSub.imgPath;
            this.status = this.viewSub.status
        }
        this.checkCurrentSub();
        console.log(this.viewSub)
    }

    checkCurrentSub() {
        subscriptionData[this.subId].paymentHistory.forEach(payData => {
            if (this.formatDate(payData.billDate) == this.getCurrentMonthYear()){
                this.currentSubscription = true;
            }
        })
    }

    setSubName= (e) => {
        this.subName = e.target.value; 
    }

    setAmount = (e) => {
        this.amount = e.target.value;
    }

    setDuration = (e) => {
        this.durationCycle = e.target.value;
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

        if(this.billCycle == 'Seconds'){
            const time = this.durationCycle * 1000;
            this.wallet.deductAmountMinutes(this.amount, time, this.viewSub);
        }

        if(this.billCycle == 'Minutes'){
            const time = this.durationCycle * 60000;
            this.wallet.deductAmountMinutes(this.amount, time, this.viewSub);
        }

        if(this.billCycle == 'Days'){
            const time = this.durationCycle * 24 * 60 * 60 * 1000;
            this.wallet.deductAmountMinutes(this.amount, time, this.viewSub);
        }

        if(this.billCycle == 'Monthly'){
            const time = 30.44 * 24 * 60 * 60 * 1000;
            this.wallet.deductAmountMinutes(this.amount, time, this.viewSub);
        }

        
        if(this.billCycle == '3-Months'){
            const time = 3*30.44 * 24 * 60 * 60 * 1000;
            this.wallet.deductAmountMinutes(this.amount, time, this.viewSub);
        }

        if(this.billCycle == 'Yearly'){
            const time = 365.25 * 24 * 60 * 60 * 1000;
            this.wallet.deductAmountMinutes(this.amount, time, this.viewSub);
        }

        setTimeout(()=> {
            this.back();
        },2000)
    }

    @action
    deleteSubb(){
        const index = subscriptionData.indexOf(this.viewSub);
        
        if (index > -1){
            if (confirm('Are you sure want to delete the subscription') == true){
                subscriptionData.splice(index, 1);
                this.back();
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
    cancelSub() {
        if(confirm("Are you sure want to cancel current subscription") == true){
            subscriptionData[this.subId].paymentHistory.forEach(payData => {
                if (this.formatDate(payData.billDate) == this.getCurrentMonthYear()){
                    this.wallet.creditAmount(Number(payData.amnt))
                    this.initWallet(Number(payData.amnt))
                }
            });
        }
    }

    @action
    back() {
        this.router.transitionTo('subscription')
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
                statement: 'Received',
                sent: false,
                method: 'refund',
                amount: amnt
            })
            console.log(walletHistory)
        }
}
