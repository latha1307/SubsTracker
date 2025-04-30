import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { walletHistory } from '../data/walletHistory';

export default class Home extends Component {

    @service wallet;
    @tracked currentAmount = 0;
    @tracked addMoney = 0;
    @tracked walletData = [];


    moneyBtns = [10, 100, 200, 500, 1000];

    constructor() {
        super(...arguments);
        this.currentAmount = this.wallet.amount;
        this.loadWallet();
    }

    @action
    loadWallet() {
        this.walletData = walletHistory.slice().reverse();
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
        this.currentAmount += this.addMoney;
        this.wallet.creditAmount(this.addMoney);
        this.initWallet(this.addMoney);
        this.addMoney = 0;

    }

    @action
    setAddMoney(e) {
        console.log(e.value)
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
            name: 'Bank',
            imgPath: '/assets/images/courthouse.png',
            statement: 'Received',
            sent: false,
            method: 'credit',
            amount: amnt
        })
        this.loadWallet()
        console.log(walletHistory)
    }
}
