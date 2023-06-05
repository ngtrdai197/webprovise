import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EnvironmentModule } from './environment/environment.module';
import { CompanyTreeModule } from './company-tree/company-tree.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    EnvironmentModule.forRoot(),
    CommonModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    CompanyTreeModule,
  ],
})
export class AppModule {}
