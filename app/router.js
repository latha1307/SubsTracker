import EmberRouter from '@ember/routing/router';
import config from 'task1/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('addSubscription');
  this.route('home');
  this.route('subscription');
  this.route('view-subscription', { path: 'subscriptions/:id'});
  this.route('view-history', { path: 'view/history/:id'});
});
