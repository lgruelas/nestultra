import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { UpdateCarDto, CreateCarDto } from './dto';
import { CarEntity } from './entities/car.entity';
import { ManufacturerEntity } from './entities/manufacturer.entity';
import { OwnerEntity } from './entities/owner.entity';

@Injectable()
export class CarsService {
    constructor (
        @InjectRepository(CarEntity)
        private carRepository: Repository<CarEntity>
    ) {}

    async create(carDto: CreateCarDto): Promise<CarEntity> {
        const {
            manufacturer: manufacturerDto,
            owners: ownersDto
        } = carDto;
        let newCar = new CarEntity();
        const manufacturer = new ManufacturerEntity();
        manufacturer.name = manufacturerDto.name;
        manufacturer.phone = manufacturerDto.phone;
        manufacturer.siret = manufacturerDto.siret;
        const owners = ownersDto.map(ownerDto => {
            const owner = new OwnerEntity();
            owner.name = ownerDto.name;
            return owner;
        });
        newCar.price = carDto.price;
        newCar.manufacturer = manufacturer;
        newCar.owners = owners;
        return this.carRepository.save(newCar);
    }

    findAll(): Promise<CarEntity[]> {
        return this.carRepository.find({relations: ["manufacturer", "owners"]});
    }

    async findOne(id: string): Promise<CarEntity> {
        const found = await this.carRepository.findOne(id, {relations: ["manufacturer", "owners"]});
        if (!found) {
            throw new NotFoundException("Car with given id not found.");
        }
        return found;
    }

    async update(id: string, new_car: UpdateCarDto): Promise<UpdateResult> {
        return await this.carRepository.update(id, new_car);
    }

    async delete(id: string): Promise<void> {
        const result = await this.carRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException("Car with given id not found.");
        }
    }
}
