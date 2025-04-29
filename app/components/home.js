import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class Home extends Component {

    @service wallet;
    @tracked currentAmount = 0;
    @tracked addMoney = 0;


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
        this.currentAmount += this.addMoney;
        this.wallet.creditAmount(this.addMoney);
        this.addMoney = 0;
    }

    @action
    setAddMoney(e) {
        console.log(e.value)
    }
}
