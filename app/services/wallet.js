import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { walletHistory } from '../data/walletHistory';
import { subscriptionData } from '../data/subscriptionData';
import { A } from '@ember/array';

export default class WalletService extends Service {
    @tracked amount = 2000;
    @tracked autopay = [];
    @tracked currentFilterStatus = 'all';
    @tracked walletData = A([]);
    @tracked onHold = false;
    @tracked pendingTrans = A([]);
    
    constructor() {
        super(...arguments);
        if(this.amount < 0){
            alert('Insufficient Balance')
        }
        this.loadData();
    }

    loadData() {
        if(this.currentFilterStatus == 'all'){
            this.walletData = A(walletHistory.slice().reverse());
        } else if(this.currentFilterStatus == 'credit') {
            this.walletData = A(walletHistory.slice().reverse().filter(val => val.method == 'credit'));
        } else if(this.currentFilterStatus == 'debit') {
            this.walletData = A(walletHistory.slice().reverse().filter(val => val.method == 'debit'));
        } else {
            this.walletData = A(walletHistory.slice().reverse().filter(val => val.method == 'refund'));
        }
    }


    debitAmount(amnt) {  
        if(this.amount < 0){
            alert('Insufficient balance. Please add money to wallet')
            this.clearAllIntervals()
            return false
        }
        if(this.amount-amnt < 0){
            alert('Insufficient balance. Please add money to wallet')
            this.clearAllIntervals()
            return false
        }
        
        this.amount -= amnt;
        return true
    }

    creditAmount(amnt) {
        this.amount += amnt;
        if(this.onHold) {
            this.pendingTrans.forEach(data => {
                this.deductAmountMinutes(data.amount, data.duration, data.array)
            })
        }
    }

    checkSubscriptionExist(id) {
        return subscriptionData.find(data => data.id == id)
    }

    createInterval(callback, delay) {
        const intervalId = setInterval(callback, delay);
        this.autopay.push(intervalId);
        return intervalId; 
      }

    clearAllIntervals() {
        this.autopay.forEach(intervalId => clearInterval(intervalId));
        this.autopay.length = 0; 
      }

    clearIntervalById(intervalId) {
        clearInterval(intervalId);
        const index = this.autopay.indexOf(intervalId);
        if (index > -1) {
            this.autopay.splice(index, 1);
        }
        console.log(this.autopay)
    }

    deductAmountMinutes(amnt, time, data) {
        if(time > 0) {
        const interval =  this.createInterval(() => {
            if((this.amount-amnt) < 0){
                alert('Insufficient balance. Please add money to wallet');
                console.log('runing')
                this.onHold = true;
                console.log('worked')
                this.pendingTrans.pushObject({
                    amount: amnt,
                    duration: time,
                    array: data
                })
                this.clearIntervalById(interval)
                
                return
            }
            if(this.checkSubscriptionExist(data.id)){
            this.amount -= amnt
            this.initWallet(data, amnt) 
            }
    
        }, time)
    }
    else{
        this.clearIntervalById(data.id)
        console.log(data.id)
    }
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
    initWallet(data, amnt) {
        walletHistory.push({
            id: walletHistory.length + 1,
            date: this.getCurrentDate(),
            name: data.subName,
            imgPath: data.imgPath,
            statement: 'Paid',
            sent: true,
            time: this.getCurrentTime(),
            method: 'debit',
            amount: amnt
        })
        subscriptionData[data.id].paymentHistory.push({
            billDate: this.getCurrentDate(),
            subPlan: data.plan,
            amnt: amnt,
            payMethod: 'Wallet'
        })
        this.loadData();
    }

}
