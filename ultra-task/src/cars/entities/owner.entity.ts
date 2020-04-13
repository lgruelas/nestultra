import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class OwnerEntity {
    @PrimaryGeneratedColumn('uuid') id: string;

    @Column() name: string;

    @CreateDateColumn() purchaseDate: Date;
}