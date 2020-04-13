import { Controller, Get, Post, Put, Delete, Param, Body, ValidationPipe, UsePipes } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';
import { CarEntity } from './entities/car.entity';
import { ManufacturerEntity } from './entities/manufacturer.entity';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createCarDto: CreateCarDto) {
        return await this.carsService.create(createCarDto);
    }

    @Get()
    async findAll(): Promise<CarEntity[]> {
        return await this.carsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<CarEntity> {
        return this.carsService.findOne(id);
    }

    @Get(':id/manufacturer')
    findManufacturer(@Param('id') id: string): Promise<ManufacturerEntity> {
        return this.carsService.findManufacturer(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCar: UpdateCarDto): Promise<void> {
        return this.carsService.update(id, updateCar);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.carsService.delete(id);
    }
}
