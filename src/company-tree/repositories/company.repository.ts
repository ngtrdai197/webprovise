import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { lastValueFrom, map, tap } from 'rxjs';
import { CompanyDto } from '../dto/company.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CompanyRepository {
  constructor(private readonly httpService: HttpService) {}

  public async getCompanies(): Promise<CompanyDto[]> {
    return await lastValueFrom(
      this.httpService.get('/companies').pipe(
        tap({
          next(value) {
            if (value.status !== HttpStatus.OK) {
              throw new HttpException('Can not get companies', value.status);
            }
          },
        }),
        map((response) => {
          return plainToInstance(CompanyDto, response.data as unknown[]);
        }),
      ),
    );
  }
}
