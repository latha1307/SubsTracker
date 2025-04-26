import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ViewHistory extends Component {
    @tracked subName = '';
    @tracked imgPath = '';

    @tracked viewHistory = null; 

    constructor() {
        super(...arguments);
        this.viewHistory = this.args.viewHistory;
        if(this.viewHistory){
            this.subName = this.viewHistory.subName;
            this.imgPath = this.viewHistory.imgPath;
        }
        console.log(this.subName)
    }
}
