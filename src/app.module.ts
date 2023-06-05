import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { EnvironmentModule } from './environment/environment.module';
import { CompanyTreeModule } from './company-tree/company-tree.module';
import { CommonModule } from './common/common.module';
import { EnvironmentService } from './environment/environment.service';
import { graphqlFormattedError } from './common/utils/graphql-format-error';

@Module({
  imports: [
    EnvironmentModule.forRoot(),
    CommonModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (envService: EnvironmentService) => ({
        playground: envService.get<string>('env') === 'prod' ? false : true,
        autoSchemaFile: 'schema.gql',
        context: ({ req }) => ({ req }),
        formatError: graphqlFormattedError,
      }),
      inject: [EnvironmentService],
    }),
    CompanyTreeModule,
  ],
})
export class AppModule {}
