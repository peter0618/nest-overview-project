import * as clc from 'cli-color';
import { Injectable, LoggerService, Optional } from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import moment = require('moment');

/**
 * Custom Logger 입니다.
 * TODO : 1) 소스코드 리팩토링(중복코드 제거 등)
 * TODO : 2) LogLevel 설정하기
 * TODO : 3) error 로그시, trace 처리
 */
@Injectable()
export class MyLogger implements LoggerService {

  private static instance?: typeof MyLogger | LoggerService = MyLogger;
  private static appName: string;

  constructor(@Optional() protected context?: string){
    MyLogger.appName = 'APP_NAME';
  }

  setContext(context: string){
    this.context = context;
  }

  error(message: any, trace?: string, context?: string) {
    const color = clc.red;
    const pidMessage = color(`[${MyLogger.appName}] ${process.pid} - `);
    const contextMessage = clc.yellow(`[${context || this.context}]`) ;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const output = isObject(message) ? color(`Object:\n${JSON.stringify(message, null, 2)}`) : color(`${message}`);
    process.stdout.write(`${pidMessage}${timestamp} ${contextMessage} ${output} \n`);
  }

  debug(message: any, context?: string) {
    const color = clc.magentaBright;
    const pidMessage = color(`[${MyLogger.appName}] ${process.pid} - `);
    const contextMessage = clc.yellow(`[${context || this.context}]`) ;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const output = isObject(message) ? color(`Object:\n${JSON.stringify(message, null, 2)}`) : color(`${message}`);
    process.stdout.write(`${pidMessage}${timestamp} ${contextMessage} ${output} \n`);
  }

  log(message: any, context?: string) {
    const color = clc.green;
    const pidMessage = color(`[${MyLogger.appName}] ${process.pid} - `);
    const contextMessage = clc.yellow(`[${context || this.context}]`) ;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const output = isObject(message) ? color(`Object:\n${JSON.stringify(message, null, 2)}`) : color(`${message}`);
    process.stdout.write(`${pidMessage}${timestamp} ${contextMessage} ${output} \n`);
  }

  verbose(message: any, context?: string) {
    const color = clc.blueBright;
    const pidMessage = color(`[${MyLogger.appName}] ${process.pid} - `);
    const contextMessage = clc.yellow(`[${context || this.context}]`) ;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const output = isObject(message) ? color(`Object:\n${JSON.stringify(message, null, 2)}`) : color(`${message}`);
    process.stdout.write(`${pidMessage}${timestamp} ${contextMessage} ${output} \n`);
  }

  warn(message: any, context?: string) {
    const color = clc.xterm(208);
    const pidMessage = color(`[${MyLogger.appName}] ${process.pid} - `);
    const contextMessage = clc.yellow(`[${context || this.context}]`) ;
    const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
    const output = isObject(message) ? color(`Object:\n${JSON.stringify(message, null, 2)}`) : color(`${message}`);
    process.stdout.write(`${pidMessage}${timestamp} ${contextMessage} ${output} \n`);
  }
}
