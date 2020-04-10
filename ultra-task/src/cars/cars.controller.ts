import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './interfaces';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Post()
    create(@Body() createCarDto: CreateCarDto) {
        const generatedId: string = this.carsService.create(createCarDto);
        return { id: generatedId };
    }

    @Get()
    findAll(): Array<Car> {
        return this.carsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.carsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCar: UpdateCarDto): void {
        this.carsService.update(id, updateCar);
    }

    @Delete(':id')
    remove(@Param('id') id: string): void {
        this.carsService.delete(id);
    }
}
