import Component from '@glimmer/component';

export default class HeadBar extends Component {
    headItems = [
        { label: 'My Wallet', isSelected: true },
        { label: 'View Subscriptions', isSelected: false},
        { label: 'Recent Transactions', isSelected: false},
    ]
}
