import { Test, TestingModule } from '@nestjs/testing';
import { CompanyTreeService } from './company-tree.service';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyDto } from './dto/company.dto';
import { TravelDto } from './dto/travel.dto';
import { HttpModule } from '@nestjs/axios';
import { TravelRepository } from './repositories/travel.repository';

describe('CompanyTreeService', () => {
  let service: CompanyTreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CompanyTreeService, CompanyRepository, TravelRepository],
    }).compile();

    service = module.get<CompanyTreeService>(CompanyTreeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('buildCompanyTree()', () => {
    it('should returns an empty array when no companies are provided', () => {
      const tree = service.buildCompanyTree([]);
      expect(tree).toEqual([]);
    });
    it('should returns the correct number of nodes', () => {
      const companies: CompanyDto[] = [
        { id: '1', name: 'Company 1', parentId: '0', createdAt: new Date() },
        { id: '2', name: 'Company 2', parentId: '1', createdAt: new Date() },
        { id: '3', name: 'Company 3', parentId: '2', createdAt: new Date() },
        { id: '4', name: 'Company 4', parentId: '0', createdAt: new Date() },
      ];
      const tree = service.buildCompanyTree(companies);
      expect(tree.length).toBe(2);
    });
    it('should returns nodes with correct parentId and the correct number of nodes', () => {
      const companies: CompanyDto[] = [
        { id: '1', name: 'Company 1', parentId: '0', createdAt: new Date() },
        { id: '2', name: 'Company 2', parentId: '1', createdAt: new Date() },
        { id: '3', name: 'Company 3', parentId: '2', createdAt: new Date() },
      ];
      const tree = service.buildCompanyTree(companies);

      // nodes with correct parentId
      expect(tree[0].children[0].parentId).toBe('1');
      expect(tree[0].children[0].children[0].parentId).toBe('2');

      // correct number of nodes
      expect(tree[0].children.length).toBe(1);
      expect(tree[0].children[0].children.length).toBe(1);
    });
    it('should return company tree without costs if travels array is empty', () => {
      const companies: CompanyDto[] = [
        { id: '1', name: 'Company 1', parentId: '0', createdAt: new Date() },
        { id: '2', name: 'Company 2', parentId: '0', createdAt: new Date() },
      ];
      const travels: TravelDto[] = [];
      const expected = [
        {
          id: '1',
          name: 'Company 1',
          cost: '0',
          createdAt: companies[0].createdAt,
          parentId: '0',
          children: [],
        },
        {
          id: '2',
          name: 'Company 2',
          cost: '0',
          createdAt: companies[1].createdAt,
          parentId: '0',
          children: [],
        },
      ];
      const result = service.buildCompanyTree(companies, travels);

      expect(result).toEqual(expected);
    });
    it('should build a tree with child nodes', () => {
      const companies: CompanyDto[] = [
        { id: '1', name: 'Company 1', parentId: '0', createdAt: new Date() },
        { id: '2', name: 'Company 2', parentId: '1', createdAt: new Date() },
        { id: '3', name: 'Company 3', parentId: '1', createdAt: new Date() },
        { id: '4', name: 'Company 4', parentId: '2', createdAt: new Date() },
        { id: '5', name: 'Company 5', parentId: '4', createdAt: new Date() },
      ];
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
        {
          id: '2',
          companyId: '2',
          price: '200',
          createdAt: new Date(),
          departure: 'dep-2',
          destination: 'des-2',
          employeeName: 'employee-2',
        },
        {
          id: '3',
          companyId: '3',
          price: '300',
          createdAt: new Date(),
          departure: 'dep-3',
          destination: 'des-3',
          employeeName: 'employee-3',
        },
        {
          id: '4',
          companyId: '4',
          price: '400',
          createdAt: new Date(),
          departure: 'dep-4',
          destination: 'des-4',
          employeeName: 'employee-4',
        },
        {
          id: '5',
          companyId: '5',
          price: '500',
          createdAt: new Date(),
          departure: 'dep-5',
          destination: 'des-5',
          employeeName: 'employee-5',
        },
      ];
      const expected = [
        {
          id: '1',
          name: 'Company 1',
          cost: '1500', // 100 (price company 1) + 1100 (price company 2) + 300 (price - company 3)
          createdAt: companies[0].createdAt,
          parentId: '0',
          children: [
            {
              id: '2',
              name: 'Company 2',
              cost: '1100', // 200 (price - company 2) + 900 (price - company 4)
              createdAt: companies[1].createdAt,
              parentId: '1',
              children: [
                {
                  id: '4',
                  name: 'Company 4',
                  cost: '900', // 400 (price - company 4) + 500 (price - company 5)
                  createdAt: companies[3].createdAt,
                  parentId: '2',
                  children: [
                    {
                      id: '5',
                      name: 'Company 5',
                      cost: '500',
                      createdAt: companies[4].createdAt,
                      parentId: '4',
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              id: '3',
              name: 'Company 3',
              cost: '300',
              createdAt: companies[2].createdAt,
              parentId: '1',
              children: [],
            },
          ],
        },
      ];
      const result = service.buildCompanyTree(companies, travels);

      expect(result).toEqual(expected);
    });
  });
});
