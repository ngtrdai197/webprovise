import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { CompanyRepository } from './company.repository';
import { CompanyDto } from '../dto/company.dto';

describe('CompanyRepository', () => {
  let repository: CompanyRepository;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyRepository,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<CompanyRepository>(CompanyRepository);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('getCompanies', () => {
    it('should returns an array of companies on successful API call', async () => {
      const companies: CompanyDto[] = [
        { id: '1', name: 'Company 1', parentId: '0', createdAt: new Date() },
      ];

      const response = { data: companies, status: HttpStatus.OK };
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(response as any));
      const result = await repository.getCompanies();
      expect(result).toEqual(companies);
    });

    it('should throws HttpException with status code on unsuccessful API call', async () => {
      const response = { status: HttpStatus.INTERNAL_SERVER_ERROR };
      jest
        .spyOn(httpService, 'get')
        .mockImplementation(() => of(response as any));
      await expect(repository.getCompanies()).rejects.toThrow(
        new HttpException('Can not get companies', response.status),
      );
    });
  });
});
