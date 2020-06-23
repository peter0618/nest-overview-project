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
