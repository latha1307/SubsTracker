import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { walletHistory } from '../data/walletHistory';

export default class Home extends Component {

    @service wallet;
    @tracked currentAmount = 0;
    @tracked addMoney = 0;
    @tracked currentFilterStatus = 'all';


    moneyBtns = [10, 100, 200, 500, 1000];

    constructor() {
        super(...arguments);
        this.currentAmount = this.wallet.amount;
    }


    @action
    onChangeMoney(amt){
        this.addMoney += amt;
    }

    @action
    addAmount(e) {
        this.addMoney = Number(e.target.value);
    }

    @action
    addToWallet(e){
        e.preventDefault()
        if(this.addMoney == 0) {
            alert('Please enter amount');
            return
        }
        this.currentAmount += this.addMoney;
        this.wallet.creditAmount(this.addMoney);
        this.initWallet(this.addMoney);
        this.addMoney = 0;

    }

    @action
    setAddMoney(e) {
        console.log(e.value)
    }

    getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12;
        hours = hours ? hours : 12;
      
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      
        return hours + ':' + formattedMinutes + ' ' + ampm;
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
        this.wallet.walletData.push({
            id: this.wallet.walletData.length + 1,
            date: this.getCurrentDate(),
            name: 'Bank',
            imgPath: '/assets/images/courthouse.png',
            statement: 'Received',
            sent: false,
            time: this.getCurrentTime(),
            method: 'credit',
            amount: amnt
        })
        this.wallet.loadData();
    }

    @action
    currentFilter(val) {
        this.wallet.currentFilterStatus = val;
        this.wallet.loadData()
    }
}
