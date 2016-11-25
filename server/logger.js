'use strict';

import util from 'util';
import winston from 'winston';
import path from 'path';
import { Meteor } from 'meteor/meteor';

winston.transports.DailyRotateFile = require('winston-daily-rotate-file');
let production = (process.env.NODE_ENV || '').toLowerCase() === 'production';

if (production) {
  let logDir = Meteor.settings['private']['logs'];

  let logOpts = {
    transports: [
      new(winston.transports.Console)(),
      new(winston.transports.DailyRotateFile)({
        name: 'info',
        datePattern: '.yyyy-MM-ddTHH',
        filename: path.join(logDir, "cba.log"),
        level: 'info',
        json : false,
        tailable : true
      }),
      new(winston.transports.DailyRotateFile)({
        name: 'error',
        datePattern: '.yyyy-MM-ddTHH',
        filename: path.join(logDir, "cba_error.log"),
        level: 'error',
        json : false,
        tailable : true
      })
    ]
  }

  let logger = new winston.Logger(logOpts);
  let formatArgs = (args) => {
    let arr = Array.prototype.slice.call(args);
    arr.unshift(`\t[${new Date().toISOString()}]\t`);
    return arr;
  }

  let log = console.log;
  console.log = function() {
    // a special case for Meteor, console log has to return during the LISTERNING log, otherwise, server cannot process request after
    // start up
    if (arguments.length === 1 && arguments[0] === 'LISTENING') return log.call(console, 'LISTENING');
    logger.info.apply(logger, arguments);
  };

  ['info', 'warn', 'error', 'debug'].forEach(function(method) {
    console[method] = function() {
      logger[method].apply(logger, arguments);
    }
  });
}
