import { Field, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class CompanyTreeDto {
  @Expose()
  @Field(() => String)
  id: string;

  @Expose()
  @Field(() => String)
  name: string;

  @Expose()
  @Field(() => Date)
  createdAt: Date;

  @Expose()
  @Field(() => String)
  parentId: string;

  @Expose()
  @Field(() => String)
  cost: string;

  @Expose()
  @Field(() => [CompanyTreeDto])
  children: CompanyTreeDto[];
}
