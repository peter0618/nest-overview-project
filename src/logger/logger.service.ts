import * as clc from 'cli-color';
import { Injectable, LoggerService, Optional } from '@nestjs/common';
import { isObject } from '@nestjs/common/utils/shared.utils';
import moment = require('moment');

/**
 * Custom Logger 입니다.
 *
 * TODO : 2) LogLevel 설정하기
 * TODO : 3) error 로그시, trace 처리
 */
@Injectable()
export class MyLogger implements LoggerService {
  // private static instance?: typeof MyLogger | LoggerService = MyLogger;
  private static appName: string;
  private readonly COLOR_OF_ERROR = clc.red;
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

  error(message: any, trace?: string, context?: string) {
    this.printMessage(this.COLOR_OF_ERROR, message, context);
    // TODO : 단순히 로그를 찍는 것이 아니라 trace 를 어떻게 찍을지 표현해야 합니다.
  }

  debug(message: any, context?: string) {
    this.printMessage(this.COLOR_OF_DEBUG, message, context);
  }

  log(message: any, context?: string) {
    this.printMessage(this.COLOR_OF_LOG, message, context);
  }

  verbose(message: any, context?: string) {
    this.printMessage(this.COLOR_OF_VERBOSE, message, context);
  }

  warn(message: any, context?: string) {
    this.printMessage(this.COLOR_OF_WARN, message, context);
  }

  private printMessage(color: any, message: any, context?: string) {
    const pidMessage = color(`[${MyLogger.appName}] ${process.pid} - `);
    const contextMessage = this.COLOR_OF_CONTEXT(
      `[${context || this.context}]`,
    );
    const timestamp = this.COLOR_OF_TIMESTAMP(
      `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
    );
    const output = isObject(message)
      ? color(`Object:\n${JSON.stringify(message, null, 2)}`)
      : color(`${message}`);
    process.stdout.write(
      `${pidMessage}${timestamp} ${contextMessage} ${output} \n`,
    );
  }
}
