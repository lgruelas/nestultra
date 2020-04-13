import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';

import { ManufacturerEntity } from './manufacturer.entity';
import { OwnerEntity } from './owner.entity';

@Entity()
export class CarEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column({default: new Date()}) firstRegistrationDate: Date;

    @Column('real') price: number;

    @ManyToOne(type => ManufacturerEntity, manufacturer => manufacturer.cars, {cascade: true})
    manufacturer: ManufacturerEntity;

    @ManyToMany(type => OwnerEntity, {cascade: true})
    @JoinTable()
    owners: Array<OwnerEntity>;
}