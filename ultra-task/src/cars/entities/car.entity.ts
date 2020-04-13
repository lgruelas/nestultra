import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { ManufacturerEntity } from './manufacturer.entity';
import { OwnerEntity } from './owner.entity';

@Entity()
export class CarEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() firstRegistrationDate: Date;

    @Column() price: number;

    @ManyToOne(type => ManufacturerEntity, manufacturer => manufacturer.cars, {cascade: true})
    manufacturer: ManufacturerEntity;

    @ManyToMany(type => OwnerEntity, {cascade: true})
    @JoinTable()
    owners: Array<OwnerEntity>;
}