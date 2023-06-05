import { Expose } from 'class-transformer';

export class TravelDto {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  employeeName: string;

  @Expose()
  departure: string;

  @Expose()
  destination: string;

  @Expose()
  price: string;

  @Expose()
  companyId: string;
}
