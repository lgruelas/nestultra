import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CarEntity } from './../cars/entities/car.entity';
import { OwnerEntity } from './../cars/entities/owner.entity';

@Injectable()
export class TriggerService {
    constructor (
        @InjectRepository(CarEntity)
        private carRepository: Repository<CarEntity>
    ) {}
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

    triggerPopulate() {
        const car1: CarEntity = this.carRepository.create({
            id: '2d07b038-4d10-4af8-a009-8f3b145f47ec',
            price: 2250,
            firstRegistrationDate: new Date('01/02/2019'),
            manufacturer: {
                id: '54681173-0b18-4c26-abbe-0b1bf86836a1',
                name: 'manufacturer1',
                phone: 'phone1',
                siret: 10
            },
            owners: [{
                id: 'e986a6c0-c2a0-4cca-88cf-09202bc8e2ef',
                name: 'first owner',
                purchaseDate: new Date('01/02/2013'),
            },{
                id: '1c5fae25-aea9-4a65-80db-504b36660f05',
                name: 'second owner',
                purchaseDate: new Date('01/02/2020'),
            },{
                id: 'b7ea0a82-d2e6-4c98-a9b6-7a248793fb86',
                name: 'third owner',
                purchaseDate: new Date('01/02/2019'),
            }]
        });
        const car2: CarEntity = this.carRepository.create({
            id: 'e0ce8303-f566-4cce-8c9c-2d9a1c621a78',
            price: 2250,
            firstRegistrationDate: new Date('01/02/2019'),
            manufacturer: {
                id: '64dc68f8-a173-42cd-bdb8-7acd08894537',
                name: 'manufacturer2',
                phone: 'phone2',
                siret: 12
            },
            owners: [{
                id: 'e986a6c0-c2a0-4cca-88cf-09202bc8e2ef',
                name: 'first owner',
                purchaseDate: new Date('01/02/2013'),
            },{
                id: '1c5fae25-aea9-4a65-80db-504b36660f05',
                name: 'second owner',
                purchaseDate: new Date('01/02/2020'),
            },{
                id: 'ca652af0-ac61-499c-bfc5-31ab9ce13510',
                name: 'fourth owner',
                purchaseDate: new Date('06/02/2018'),
            }]
        });
        return this.carRepository.save([car1, car2]);
    }
}
