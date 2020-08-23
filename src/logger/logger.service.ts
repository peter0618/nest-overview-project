import * as clc from 'cli-color';
import { Injectable, LoggerService, Optional } from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import moment = require('moment');

@Injectable()
export class MyLogger implements LoggerService {

  private static instance?: typeof MyLogger | LoggerService = MyLogger;
  private static appName: string;

  constructor(@Optional() protected context?: string){
    MyLogger.appName = 'NEST_OVERVIEW';
  }

  debug(message: any, context?: string) {
    console.log('debug');
  }

  error(message: any, trace?: string, context?: string) {
    console.log('error');
  }

  log(message: any, context?: string) {
    const color = clc.green;
    const pidMessage = color(`[${MyLogger.appName}] ${process.pid} - `);
    const contextMessage = clc.yellow(`[${context || this.context}]`) ;
    // const timestamp = new Date(Date.now()).toISOString();
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const output = isObject(message) ? color(`Object:\n${JSON.stringify(message, null, 2)}`) : color(`${message}`);
    process.stdout.write(`${pidMessage}${timestamp} ${contextMessage} ${output} \n`);
  }

  verbose(message: any, context?: string) {
    console.log('verbose');
  }

  warn(message: any, context?: string) {
    console.log('warn');
  }
}
