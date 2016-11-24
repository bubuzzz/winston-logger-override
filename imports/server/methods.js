import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'test': function() {
    console.log('....log');
    console.info('....info');
    console.error('....error');
    console.debug('....debug');
    console.warn('....warn');
    return 'test'
  }
})
