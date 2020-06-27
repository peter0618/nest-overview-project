export function logger(req: Request, res: Response, next: Function) {
  console.log(`${req.method} cats${req.url} is called!`);
  console.log(`request body : ${JSON.stringify(req.body)}`);
  next();
}
