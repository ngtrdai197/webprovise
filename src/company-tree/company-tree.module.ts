import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EnvironmentService } from 'src/environment/environment.service';
import { CompanyTreeService } from './company-tree.service';
import { QueryResolver } from './graphql/query.resolver';
import { CompanyRepository } from './repositories/company.repository';
import { TravelRepository } from './repositories/travel.repository';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (env: EnvironmentService) => {
        return {
          baseURL: env.get<string>('api_webprovise'),
        };
      },
      inject: [EnvironmentService],
    }),
  ],
  providers: [
    CompanyTreeService,
    CompanyRepository,
    TravelRepository,
    QueryResolver,
  ],
})
export class CompanyTreeModule {}
