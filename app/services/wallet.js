import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { walletHistory } from '../data/walletHistory';
import { subscriptionData } from '../data/subscriptionData';

export default class WalletService extends Service {
    @tracked amount = 2000;
    
    
    debitAmount(amnt) {
        this.amount -= amnt;
    }

    creditAmount(amnt) {
        this.amount += amnt;
    }

    deductAmountMinutes(amnt, time, data) {
        setInterval(() => {
            this.amount -= amnt
            this.initWallet(data, amnt)
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
            sent: false,
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
