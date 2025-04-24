import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Home extends Component {
    @tracked recentTrans = [
        {
            id: 1,
            name: 'Amazon',
            subPlan: 'Standard',
            billCycle: 'Monthly',
            category: 'Shopping',
            payMethod: 'UPI',
            amount: '20.00'
        },
        {
            id: 2,
            name: 'Netflix',
            subPlan: 'Pro',
            billCycle: 'Monthly',
            category: 'Entertainment',
            payMethod: 'UPI',
            amount: '30.00'
        },
        {
            id: 3,
            name: 'Added Money',
            billCycle: '',
            category: '',
            payMethod: 'UPI',
            amount: '12.00'
        },
        {
            id: 4,
            name: 'Youtube',
            subPlan: 'Standard',
            billCycle: 'Yearly',
            category: 'Entertainment',
            payMethod: 'Debit Card',
            amount: '12.00'
        },
        {
            id: 5,
            name: 'Spotify',
            subPlan: 'Standard',
            billCycle: 'Monthly',
            category: 'Music',
            payMethod: 'Net Banking',
            amount: '12.00'
        },
        {
            id: 6,
            name: 'Jio Star',
            subPlan: 'Pro+',
            billCycle: 'Yearly',
            category: 'Entertainment',
            payMethod: 'Wallet',
            amount: '12.00'
        },
    ];

    @tracked currentAmount = 2000;
    @tracked addMoney = 0;

    moneyBtns = [10, 100, 200, 500, 1000];

    @action
    onChangeMoney(amt){
        this.addMoney += amt
    }

    @action
    addToWallet(){
        this.currentAmount += this.addMoney;
        this.addMoney = 0;
    }
}
