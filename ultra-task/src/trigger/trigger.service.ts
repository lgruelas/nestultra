import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { CarEntity } from 'src/cars/entities/car.entity';
import { OwnerEntity } from 'src/cars/entities/owner.entity';

@Injectable()
export class TriggerService {
    async triggerEvent(): Promise<void> {
        // Remove owners who bought their cars before the last 18 months
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(OwnerEntity)
            .where("purchaseDate < now() - interval '18 months'")
            .execute();
        // Apply 20% discount to all cars having a date of first registration between 12 and 18 months
        await getConnection()
            .createQueryBuilder()
            .update(CarEntity)
            .set({
                price: () => "price * 0.8"
            })
            .where("firstRegistrationDate > now() - interval '18 months'")
            .andWhere("firstRegistrationDate < now() - interval '12 months'")
            .execute();
    }
}
