import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class WalletService extends Service {
    @tracked amount = 2000;
    
    
    debitAmount(amnt) {
        this.amount -= amnt;
    }

    creditAmount(amnt) {
        this.amount += amnt;
    }

}
