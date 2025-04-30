import Model from '@ember-data/model';
import { tracked } from '@glimmer/tracking';

export default class PaymentHistoryModel extends Model {
    @tracked billDate;
    @tracked subPlan;
    @tracked amnt;
    @tracked payMethod;

    constructor(data){
        Object.assign(this, data)
    }
}
