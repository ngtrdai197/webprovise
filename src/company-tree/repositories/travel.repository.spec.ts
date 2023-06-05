import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { TravelDto } from '../dto/travel.dto';
import { TravelRepository } from './travel.repository';

describe('TravelRepository', () => {
  let repository: TravelRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelRepository,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<TravelRepository>(TravelRepository);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getTravels', () => {
    it('should returns an array of travels on successful API call', async () => {
      const travels: TravelDto[] = [
        {
          id: '1',
          companyId: '1',
          price: '100',
          createdAt: new Date(),
          departure: 'dep-1',
          destination: 'des-1',
          employeeName: 'employee-1',
        },
      ];
      const response = { data: travels, status: HttpStatus.OK };
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(response as any));
      const result = await repository.getTravels();
      expect(result).toEqual(travels);
    });

    it('should throws HttpException with status code on unsuccessful API call', async () => {
      const response = { status: HttpStatus.INTERNAL_SERVER_ERROR };
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(response as any));
      await expect(repository.getTravels()).rejects.toThrow(
        new HttpException('Can not get travels', response.status),
      );
    });
  });
});
