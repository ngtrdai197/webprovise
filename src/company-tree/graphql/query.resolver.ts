import { Resolver, Query } from '@nestjs/graphql';
import { CompanyTreeDto } from '../dto/company-tree.dto';
import { CompanyTreeService } from '../company-tree.service';
import { CompanyDto } from '../dto/company.dto';

@Resolver(() => CompanyTreeDto)
export class QueryResolver {
  constructor(private readonly companyTreeService: CompanyTreeService) {}

  @Query(() => [CompanyTreeDto])
  async getWebProvise(): Promise<CompanyDto[]> {
    return this.companyTreeService.getCompanyTravelWithCost();
  }
}
