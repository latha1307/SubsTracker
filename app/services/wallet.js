import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { walletHistory } from '../data/walletHistory';
import { subscriptionData } from '../data/subscriptionData';
import { A } from '@ember/array';

export default class WalletService extends Service {
    @tracked amount = 2000;
    @tracked autopay = [];
    @tracked workingAutopay = [];
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
        const subExist = subscriptionData.find(data => data.id == id);
        const subActive = subscriptionData[id-1]?.isActive;
        return (subActive && subExist)
    }

    checkCurrentAutopay(id) {
        this.autopay.forEach(data => {
            if(data.id == id){
                data.intervals.forEach(intervalId => clearInterval(intervalId))
            }
        })
    }

    createInterval(callback, delay, id) {
        const intervalId = setInterval(callback, delay);
        if(this.autopay.find(data => data.id == id)){
            const autopayIndex = this.autopay.indexOf(this.autopay.find(data => data.id == id))
            this.clearIntervalById( autopayIndex)
            this.autopay.push({
                id: id,
                intervals: intervalId
            });
        }else{
        this.autopay.push({
            id: id,
            intervals: intervalId
        });
    }

        return intervalId; 
      }

    clearAllIntervals() {
        this.autopay.forEach(intervalId => clearInterval(intervalId));
        this.autopay.length = 0; 
      }

    clearIntervalById(autopayIndex) {
        clearInterval(this.autopay[autopayIndex].intervals);
        this.autopay.splice(autopayIndex, 1);
        console.log(this.autopay)
    }

    deductAmountMinutes(amnt, time, data) {
        if(time > 0) {  
            const interval =  this.createInterval(() => {
                if((this.amount-amnt) < 0){
                    alert('Insufficient balance. Please add money to wallet');
                    this.onHold = true;
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
                this.initWallet(data, amnt, true) 
                }
            
            }, time, data.id)
        
    }
    else{
        const autopayIndex = this.autopay.indexOf(this.autopay.find(arr => arr.id == data.id))
        this.clearIntervalById(autopayIndex)
        console.log(this.autopay)
    }
    }

    getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12;
        hours = hours < 10 ? '0' + hours : 12;
      
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
    initWallet(data, amnt, historyNeed) {
        walletHistory.push({
            id: walletHistory.length + 1,
            date: this.getCurrentDate(),
            name: data.subName,
            imgPath: data.imgPath,
            statement: 'Paid',
            sent: true,
            time: this.getCurrentTime(),
            method: 'debit',
            amount: Number(amnt)
        })
        if(historyNeed){
        subscriptionData[data.id - 1].paymentHistory.push({
            billDate: this.getCurrentDate(),
            subPlan: data.plan,
            amnt: Number(amnt),
            payMethod: 'Wallet',
            secMin: true
        })
    }
        this.loadData();
    }

}
