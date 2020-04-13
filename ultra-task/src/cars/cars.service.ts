import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

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
        if (!manufacturerDto.id) {
            manufacturer.name = manufacturerDto.name;
            manufacturer.phone = manufacturerDto.phone;
            manufacturer.siret = manufacturerDto.siret;
        } else {
            // If a manufacturer id is sent, dont insert a new one in the database
            // Note: Here we should look if the id exist
            manufacturer.id = manufacturerDto.id;
        }
        const owners = ownersDto.map(ownerDto => {
            const owner = new OwnerEntity();
            if (ownerDto.id) {
                // This is the same case as in manufacturer
                owner.id = ownerDto.id;
            } else {
                owner.name = ownerDto.name;
            }
            return owner;
        });
        newCar.price = carDto.price;
        newCar.manufacturer = manufacturer;
        newCar.owners = owners;
        newCar.firstRegistrationDate = carDto.firstRegistrationDate;
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

    async update(id: string, carDto: UpdateCarDto): Promise<void> {
        if (!carDto.owners && !carDto.manufacturer) {
            await this.carRepository.update(id, carDto);
        } else {
            const {
                manufacturer: manufacturerDto,
                owners: ownersDto
            } = carDto;
            const car = new CarEntity();
            car.id = id;
            car.firstRegistrationDate = carDto.firstRegistrationDate;
            car.price = carDto.price;
            if (manufacturerDto) {
                const manufacturer = new ManufacturerEntity();
                manufacturer.id = manufacturerDto.id;  // It's only allowed to change the manufacturer
                car.manufacturer = manufacturer;
            }
            if (ownersDto) {
                    // If it has owners, change the entire list for the new one
                    const owners = ownersDto.map(ownerDto => {
                    const owner = new OwnerEntity();
                    if (ownerDto.id) {
                        owner.id = ownerDto.id;
                    } else {
                        owner.name = ownerDto.name;
                    }
                    return owner;
                });
                car.owners = owners;
            }
            await this.carRepository.save(car);
        }
    }

    async delete(id: string): Promise<void> {
        const result = await this.carRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException("Car with given id not found.");
        }
    }

    async findManufacturer(id: string): Promise<ManufacturerEntity> {
        const manufacturer = await getConnection()
            .createQueryBuilder()
            .select("manufacturer")
            .from(ManufacturerEntity, "manufacturer")
            .where( qb => {
                const subQuery = qb.subQuery()
                    .select('"car"."manufacturerId"')
                    .from(CarEntity, "car")
                    .where("car.id = :id", {id: id})
                    .getQuery();
                return "manufacturer.id = " + subQuery;
            })
            .getOne();
        if (!manufacturer) {
            throw new NotFoundException("Car with given id not found.");
        }
        return manufacturer;
    }
}
