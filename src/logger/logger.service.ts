import * as clc from 'cli-color';
import { Injectable, LoggerService, LogLevel, Optional } from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import moment = require('moment');

/**
 * Custom Logger 입니다.
 */
@Injectable()
export class MyLogger implements LoggerService {
  // private static instance?: typeof MyLogger | LoggerService = MyLogger;
  private static _logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  private static appName: string;
  private readonly COLOR_OF_ERROR = clc.red;
  private readonly COLOR_OF_TRACE = clc.red;
  private readonly COLOR_OF_DEBUG = clc.magentaBright;
  private readonly COLOR_OF_LOG = clc.green;
  private readonly COLOR_OF_VERBOSE = clc.blueBright;
  private readonly COLOR_OF_WARN = clc.xterm(208);
  private readonly COLOR_OF_TIMESTAMP = clc.xterm(231);
  private readonly COLOR_OF_CONTEXT = clc.yellow;

  constructor(@Optional() protected context?: string) {
    MyLogger.appName = 'APP_NAME'; // TODO : 환경변수에서 입력받아 사용하도록 해야 합니다.
  }

  setContext(context: string) {
    this.context = context;
  }

  /**
   * try ~ catch 로 wrapping 하지 않은 에러에 대해서는 자동적으로 error 로직을 탑니다.
   * 이 때, message 에 string type 으로 에러 메시지가 들어오고, trace 에 string type 으로 stack trace 가 들어 옵니다.
   *
   * try ~ catch 로 wrapping 한 경우, message 는 object type 으로 들어옵니다.
   * 이 때, message.message, message.stack 으로 각각 message, trace 를 가져올 수 있습니다.
   * @param message
   * @param trace
   * @param context
   */
  error(message: any, trace?: string, context?: string) {
    if (typeof message === 'object') {
      trace = message.stack;
      message = message.message;
    }

    if (!MyLogger.isLogLevelEnabled('error')) {
      return;
    }

    this.printMessage(this.COLOR_OF_ERROR, message, context);

    if (trace) {
      this.printMessage(this.COLOR_OF_TRACE, trace, context);
    }
  }

  debug(message: any, context?: string) {
    if (!MyLogger.isLogLevelEnabled('debug')) {
      return;
    }
    this.printMessage(this.COLOR_OF_DEBUG, message, context);
  }

  log(message: any, context?: string) {
    if (!MyLogger.isLogLevelEnabled('log')) {
      return;
    }
    this.printMessage(this.COLOR_OF_LOG, message, context);
  }

  verbose(message: any, context?: string) {
    if (!MyLogger.isLogLevelEnabled('verbose')) {
      return;
    }
    this.printMessage(this.COLOR_OF_VERBOSE, message, context);
  }

  warn(message: any, context?: string) {
    if (!MyLogger.isLogLevelEnabled('warn')) {
      return;
    }
    this.printMessage(this.COLOR_OF_WARN, message, context);
  }

  private static isLogLevelEnabled(logLevel: LogLevel) {
    return MyLogger._logLevels.includes(logLevel);
  }

  static set logLevels(value: LogLevel[]) {
    this._logLevels = value;
  }

  private printMessage(color: any, message: any, context?: string) {
    const pidMessage = color(`[${MyLogger.appName}] ${process.pid} - `);
    const contextMessage = this.COLOR_OF_CONTEXT(`[${context || this.context}]`);
    const timestamp = this.COLOR_OF_TIMESTAMP(`${moment().format('YYYY-MM-DD HH:mm:ss')}`);
    const output = isObject(message) ? color(`Object:\n${JSON.stringify(message, null, 2)}`) : color(`${message}`);
    process.stdout.write(`${pidMessage}${timestamp} ${contextMessage} ${output} \n`);
  }
}
