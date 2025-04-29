import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Home extends Component {

    @tracked currentAmount = 2000;
    @tracked addMoney = 0;

    moneyBtns = [10, 100, 200, 500, 1000];

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
        this.addMoney = 0;
    }

    @action
    setAddMoney(e) {
        console.log(e.value)
    }
}
