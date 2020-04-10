import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto';
//import { Car } from './car.model';

@Injectable()
export class CarsService {
    private readonly cars: Array<Car> = [];

    create(carDto: CreateCarDto): string {
        const car: Car = {id: uuid() , ...carDto};
        this.cars.push(car);
        return car.id;
    }

    findAll(): Array<Car> {
        return [...this.cars];
    }

    findOne(id: string): Car {
        const car = this.cars.find((car) => car.id === id);
        if (!car) {
            throw new NotFoundException("Requested car not found");
        }
        return {...car};
    }

    update(id: string, new_car: UpdateCarDto): void {
        const carIndex = this.cars.findIndex((car) => car.id === id);
        if (!this.cars[carIndex]) {
            throw new NotFoundException("The given car doesn't exist");
        }
        const modifyedCar = {id: id, ...new_car};
        this.cars[carIndex] = modifyedCar;
    }

    delete(id: string): void {
        const carIndex = this.cars.findIndex((car) => car.id === id);
        if (!this.cars[carIndex]) {
            throw new NotFoundException("The given car doesn't exist");
        }
        this.cars.splice(carIndex, 1);
    }
}
