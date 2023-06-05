import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { lastValueFrom, map, tap } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { TravelDto } from '../dto/travel.dto';

@Injectable()
export class TravelRepository {
  constructor(private readonly httpService: HttpService) {}

  public async getTravels(): Promise<TravelDto[]> {
    return await lastValueFrom(
      this.httpService.get('/travels').pipe(
        tap({
          next(value) {
            if (value.status !== HttpStatus.OK) {
              throw new HttpException('Can not get travels', value.status);
            }
          },
        }),
        map((response) =>
          plainToInstance(TravelDto, response.data as unknown[]),
        ),
      ),
    );
  }
}
