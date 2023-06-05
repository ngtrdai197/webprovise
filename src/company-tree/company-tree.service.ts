import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './repositories/company.repository';
import { CompanyDto } from './dto/company.dto';
import { CompanyTreeDto } from './dto/company-tree.dto';
import { TravelDto } from './dto/travel.dto';
import { NumberUtil } from '../common/utils/number.util';
import { TravelRepository } from './repositories/travel.repository';

@Injectable()
export class CompanyTreeService {
  constructor(
    private readonly companyRepo: CompanyRepository,
    private readonly travelRepo: TravelRepository,
  ) {}

  public async getCompanyTravelWithCost() {
    const [companies, travels] = await Promise.all([
      this.companyRepo.getCompanies(),
      this.travelRepo.getTravels(),
    ]);
    return this.buildCompanyTree(companies, travels);
  }

  public buildCompanyTree(
    companies: CompanyDto[],
    travels: TravelDto[] = [],
    parentId: string = '0',
  ) {
    if (!companies.length) return [];

    const nodes: CompanyTreeDto[] = [];

    companies
      .filter((company) => company.parentId === parentId)
      .forEach((company) => {
        const node: CompanyTreeDto = {
          id: company.id,
          name: company.name,
          cost: travels
            .filter((travel) => travel.companyId === company.id)
            .reduce(
              (previous, current) => NumberUtil.add(previous, current.price),
              '0',
            ),
          createdAt: company.createdAt,
          parentId: company.parentId,
          children: [],
        };

        const children = this.buildCompanyTree(companies, travels, company.id);
        if (children.length > 0) {
          node.children = children;
          node.cost = NumberUtil.add(
            node.cost,
            children.reduce(
              (previous, current) => NumberUtil.add(previous, current.cost),
              '0',
            ),
          );
        }

        if (!nodes.find((n) => n.id === node.id)) {
          nodes.push(node);
        }
      });

    return nodes;
  }
}
