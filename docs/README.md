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
