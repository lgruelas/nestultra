import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { CarEntity } from './car.entity';

@Entity()
export class ManufacturerEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column() name: string;

    @Column() siret: number;

    @Column() phone: string;

    @OneToMany(type => CarEntity, car => car.manufacturer)
    cars: Array<CarEntity>
}