import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'task1/config/environment';
import 'ember-power-select/styles';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';
import 'ember-power-select/styles';
import { registerDateLibrary } from 'ember-power-calendar';
import DateUtils from 'ember-power-calendar-luxon';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
registerDateLibrary(DateUtils);