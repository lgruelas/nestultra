import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class OwnerEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column() name: string;

    @Column({default: new Date()}) purchaseDate: Date;
}