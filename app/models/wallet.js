import Model from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class WalletModel extends Model {
    @tracked walletAmount;

    constructor(data){
        Object.assign(this, data)
    }
}
