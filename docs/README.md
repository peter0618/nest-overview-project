## Controller

NestJs에서 기본 단위는 Module입니다. Controller를 추가하고 싶어도, 기본적으로 Module을 먼저 만들고 추가하는 것이 좋은 것 같습니다.

```bash
# src 폴더 아래에 module폴더를 만들고, 프로젝트의 루트 폴더에서 아래 명령어를 실행하면,
# src/module 밑에 cats라는 폴더와 함께 cats.module.ts 파일이 생성되는 것을 확인할 수 있습니다.
>> nest g module module/cats
```
위와 같이 module을 생성하면, 자동으로 AppModule에 CatsModule이 imports 되어 있는 것을 확인할 수 있습니다.

```bash
# cats module을 만든 뒤, 아래 명령어를 실행하면 CatsController가 생성되며, CatsModule의 controller로 자동으로 등록됩니다.
>> nest g controller module/cats
```

## Providers

service, repository, factory, helper 등의 class가 provider입니다.
provider는 의존성을 주입할 수 있습니다.
@Injectable() 데코레이터가 붙은 class가 provider입니다.

## module

@Module 데코레이터가 붙은 class가 Module입니다.
모듈 데코레이터는 아래 4개의 프로퍼티를 갖고 있습니다.
1) providers : NestJs 가 inject 해줄 provider 목록입니다.
2) controllers : 이 모듈에 정의된 controller 목록입니다.
3) imports : 이 모듈에서 사용할 provider를 가지고 있는 다른 모듈들의 목록입니다.
4) exports : 다른 모듈에서 사용할 수 있도록 허용할 provider 목록입니다. 이 모듈을 다른 모듈에서 import 하면 여기 exports에 명시한 provider를 다른 모듈에서 사용할 수 있습니다.

모듈은 기본적으로 singleton이며 shared module이라서 하나의 provider를 여러 모듈에서 공유하여 사용할 수 있습니다.

@Global() 데코레이터를 Module 클래스에 추가하면 다른 모든 모듈에서 별도로 import 하지 않아도, 해당 모듈의 provider를 inject 받아 사용할 수 있습니다.

## Middleware

클라이언트의 요청이 Route Handler에 전달되기 전에 middleware에서 어떤 작업을 처리해줄 수 있습니다.
예를 들어, 어떤 요청이 들어왔는지 간단한 로그를 찍는 방법으로도 사용 가능합니다.

미들웨어 작성방법은 간단합니다. NestMiddleware 를 구현하는 class를 작성하고 @Injectable() 데코레이터를 적용합니다. 그리고 use 메소드를 구현하여 메소드 안에 처리하고싶은 작업 내용을 채우면 됩니다. 마지막에는 꼭 next(); 메소드로 끝내줘야 미들웨어의 작업을 마치고 다음 작업으로 넘어갑니다. (다음 작업은 또다른 미들웨어가 실행되거나, Route Handler가 될 수 있습니다.)

작성된 미들웨어를 실행하기 위해서는 모듈에서 NestModule을 implement 하면 됩니다.
그러면, configure 메소드를 작성해야 하는데 consumer로 적용할 미들웨어와 적용대상 routes를 설정할 수 있습니다.

간단한 미들웨어는 함수를 하나 작성해서 적용하는 functional middleware를 사용할 것을 권장합니다.

## Exception filters

exception 발생시 리턴 메시지 형태를 customize 해서 사용할 수 있습니다.
Exception filter를 사용하면 exception 발생시 메소드,컨트롤러,앱 등의 단위로 처리로직 및 리턴 메시지를 정의하는 것이 가능합니다.

## Pipes

역할 : 데이터 transformation과 validation
데이터 transformation은 단순 형변환 이외에도, 기본값 설정 등을 해줘야 할 때 설정 로직을 비즈니스 로직으로부터 분리시켜 pipe에 정의해서 사용할 수 있습니다.
class-validator와 class-transformer 패키지를 설치하면 class validation을 쉽게 적용 가능합니다.

## Guards

Guards는 authorization 역할을 수행합니다.
Guards는 middleware 다음에, 그리고 interceptor 나 pipe 이전에 수행됩니다.
Guards를 이용해서 인증(authentication)과 권한부여(authorization)를 쉽게 셋팅할 수 있습니다.
