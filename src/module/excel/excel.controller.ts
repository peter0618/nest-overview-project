import { Controller, Get, Header, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MyLogger } from '../../logger/logger.service';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

@Controller('excel')
export class ExcelController {
  private readonly logger: MyLogger = new MyLogger(this.constructor.name);

  private readonly users = [
    {
      name: 'John',
      age: 27,
      phone: '010-1111-1111',
    },
    {
      name: 'Peter',
      age: 23,
      phone: '010-2222-2222',
    },
    {
      name: 'Grace',
      age: 25,
      phone: '010-3333-3333',
    },
    {
      name: 'Paul',
      age: 26,
      phone: '010-4444-4444',
    },
    {
      name: 'David',
      age: 27,
      phone: '010-5555-5555',
    },
  ];

  @Get()
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  @Header('Content-Disposition', 'attachment; filename=users.xlsx')
  async makeExcel(@Res() res) {

    // step 1. workbook 생성
    const wb = XLSX.utils.book_new();

    // step 2. 시트 만들기
    const newWorksheet = XLSX.utils.json_to_sheet(this.users);

    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
    XLSX.utils.book_append_sheet(wb, newWorksheet, '연락처');

    const wbOptions = { bookType: 'xlsx', type: 'base64' }; // workbook options (XLSX.writeFile 를 이용할 때는 binary 로 셋팅)

    // const filename = 'users.xlsx';
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // step 4. 파일을 쓴다. 아래와 같이 셋팅하면 파일이 프로젝트 root 폴더에 생성되는데, 이렇게 되는 것은 원하지 않는다.
    // XLSX.writeFile(wb, filename, wbOptions); // write workbook file

    // step 5. write 한 파일을 client 에 전송합니다.
    // const stream = fs.createReadStream(filename); // create read stream
    // stream.pipe(res);

    // step 4. 파일을 생성한다. (메모리에만 저장)
    const wbout = XLSX.write(wb, wbOptions);

    // step 5. 파일을 response 한다. (참고: https://github.com/SheetJS/sheetjs/issues/122)
    res.end(Buffer.from(wbout, 'base64'));
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handleExcel(@UploadedFile() file) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });

    // 첫번째 sheet 의 이름을 조회합니다.
    const sheetName = workbook.SheetNames[0];

    // 첫번째 sheet 를 사용합니다.
    const sheet = workbook.Sheets[sheetName];

    // sheet 의 정보를 json array 로 변환합니다.
    const rows = XLSX.utils.sheet_to_json(sheet, {
      // cell 에 값이 비어있으면 '' 을 기본값으로 설정합니다.
      defval: null,
    });

    this.logger.debug(rows);

    for (const row of rows) {
      const values = Object.keys(row).map(key => row[key]);
      const [name, age, phone] = values;
      this.logger.debug(`name : ${name}, age : ${age}, phone : ${phone}`);
    }

    return true;
  }
}
