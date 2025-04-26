import Component from '@glimmer/component';


export default class SideBar extends Component {
    navItems1 = [
        { label: 'Home', img: '/assets/icons/home (1).png', path: 'home'},
        { label: 'Subscriptions', img: '/assets/icons/subscription 1.png', path: 'subscription'},
        { label: 'Spending', img: '/assets/icons/dollar-coin 1.png'},
    ]

    navItems2 = [
        { label: 'Your Account', img: '/assets/icons/user (1) 1.png'},
        { label: 'Settings', img: '/assets/icons/setting 1.png'},
        { label: 'Transactions', img: '/assets/icons/file 1.png'},
    ]
}
