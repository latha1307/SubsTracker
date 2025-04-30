import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { walletHistory } from '../data/walletHistory';
import { subscriptionData } from '../data/subscriptionData';

export default class WalletService extends Service {
    @tracked amount = 2000;
    @tracked autopay;
    
    constructor() {
        super(...arguments);
        if(this.amount < 0){
            alert('Insufficient Balance')
        }
    }
    
    debitAmount(amnt) {
        if(this.amount < 0){
            alert('Insufficient balance. Please add money to wallet')
            clearInterval(this.autopay)
            return false
        }
        if(this.amount-amnt < 0){
            alert('Insufficient balance. Please add money to wallet')
            clearInterval(this.autopay)
            return false
        }
        this.amount -= amnt;
        return true
    }

    creditAmount(amnt) {
        this.amount += amnt;
    }

    deductAmountMinutes(amnt, time, data) {
        this.autopay = setInterval(() => {
            this.debitAmount(amnt)
            this.initWallet(data, amnt)
            if(this.amount < 0){
                alert('Insufficient balance. Please add money to wallet')
                return
            }
        }, time)
    }

    getCurrentDate() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
      }

    @action
    initWallet(data, amnt) {
        walletHistory.push({
            id: walletHistory.length + 1,
            date: this.getCurrentDate(),
            name: data.subName,
            imgPath: data.imgPath,
            statement: 'Paid',
            sent: true,
            method: 'debit',
            amount: amnt
        })
        subscriptionData[data.id].paymentHistory.push({
            billDate: this.getCurrentDate(),
            subPlan: data.plan,
            amnt: amnt,
            payMethod: 'Wallet'
        })
        console.log(walletHistory)
    }

}
