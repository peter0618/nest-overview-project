import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  token = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmODhiODE0MjljYzQ1MWEzMzVjMmY1Y2RiM2RmYjM0ZWIzYmJjN2YiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQkVUQSBiMDcyMzE0NTQuMjMzNDUiLCJwaG9uZSI6IjAyNjkzMTA5MDEiLCJzZXJ2aWNlcyI6W3sic3J2Y0RpdiI6IlNDIiwidXNhSWQiOjEwMzMyLCJpZCI6NjE1fSx7InNydmNEaXYiOiJCSVoiLCJ1c2FJZCI6MTAzMzQsImlkIjo2MTV9LHsic3J2Y0RpdiI6IlNBRU0iLCJ1c2FJZCI6MTAzNDksImlkIjo2MTV9XSwic2VhbVVzZXJJZCI6NzkyLCJwcmVtaXVtQWNjb3VudCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3Blbmd1aW4tZmx5LWRldiIsImF1ZCI6InBlbmd1aW4tZmx5LWRldiIsImF1dGhfdGltZSI6MTU4NTEyNTM4OCwidXNlcl9pZCI6IjYxNSIsInN1YiI6IjYxNSIsImlhdCI6MTU4NTEyOTEzNiwiZXhwIjoxNTg1MTMyNzM2LCJlbWFpbCI6InNhZW1Ac29sYXJjb25uZWN0LmtyIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwaG9uZV9udW1iZXIiOiIrODIyNjkzMTA5MDEiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis4MjI2OTMxMDkwMSJdLCJlbWFpbCI6WyJzYWVtQHNvbGFyY29ubmVjdC5rciJdfSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.ZTDXVxMR1wM-cnP23TJUPh0-vDyOLUqD_eR4CyQMFpOG8paubrDl0FYUYWE2_ub_57qRd6C-LSDgoVzm55uy1WfgfpvfkujTaxKTFS9fLCpn2lIxFM1v6Lg-swtHNKzfpnnrVTYrcTGAQFKEZma1vsjEHq-TvYHViH_epYUaHKqBgksi_oOzSmOlMf9j36e5JXgzcwKMl2hE507Z9qgtEmwkmNSVw2gle7JrNgD0Ffe-HBIuN2jXl5eJetif4BjpzDDqheiLYezGpyJwHR2jOI0DXQa8Xmpa9UX77f2kq348FiPw20BVLT7JZ8g8W080tb2QbNM0Xhy0eBelfbiBjA`;

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if(!roles){
      return true;
    }

    console.log(roles);

    const request = context.switchToHttp().getRequest();
    // console.log(request.headers.authorization.split(' ')[1]);

    // 보통 이런식으로 토큰을 가져와서 사용자에 대한 인증을 한 뒤, 사용자 정보를 request.user 에 셋팅합니다.
    if(!(request.headers && request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer')){
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    return request.headers.authorization.split(' ')[1] === this.token;
  }
}
