import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { service } from '@ember/service';

export default class WalletService extends Service {
    @service subscription;

    @tracked amount = Number(localStorage.getItem('walletAmount'));
    @tracked autopay = [];
    @tracked workingAutopay = [];
    @tracked currentFilterStatus = 'all';
    @tracked walletData = JSON.parse(localStorage.getItem('walletHistoryData')) || [];
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
        this.walletData = A(this.walletData);
        localStorage.setItem('walletHistoryData', JSON.stringify(this.walletData))
    }


    debitAmount(amnt) {  
        if(this.amount < 0){
            alert('Insufficient balance. Please add money to wallet')
            return false
        }
        if(this.amount-amnt < 0){
            alert('Insufficient balance. Please add money to wallet')
            return false
        }
        
        this.amount -= amnt;
        localStorage.setItem('walletAmount', this.amount);
        return true
    }

    creditAmount(amnt) {
        this.amount += amnt;
        if(this.onHold) {
            this.pendingTrans.forEach(data => {
                this.deductAmountMinutes(data.amount, data.duration, data.array)
            })
        }
        localStorage.setItem('walletAmount', this.amount);
    }

    checkSubscriptionExist(id) {
        const subExist = this.subscription.subscriptionArray.find(data => data.id == id);
        const subActive = this.subscription.subscriptionArray[id-1]?.isActive;
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
                    const autopayIndex = this.autopay.indexOf(this.autopay.find(arr => arr.id == data.id))
                    this.clearIntervalById(autopayIndex)
                    return
                }
                if(this.checkSubscriptionExist(data.id)){
                    this.amount -= amnt
                    this.initWallet(data, amnt, true) 
                }
                localStorage.setItem('walletAmount', this.amount);
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
    initWallet(data, amnt, historyNeed) {
        this.walletData.push({
            id: this.walletData.length + 1,
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
        this.subscription.subscriptionArray[data.id - 1].paymentHistory.push({
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
