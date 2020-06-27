export function globalLogger(req: Request, res: Response, next: Function) {
  console.log('global Logger is called!!');
  next();
}
