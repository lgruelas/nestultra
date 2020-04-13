import { Controller, Get, Post, Put, Delete, Param, Body, ValidationPipe, UsePipes } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';
import { CarEntity } from './entities/car.entity';
import { UpdateResult } from 'typeorm';

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

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCar: UpdateCarDto): Promise<UpdateResult> {
        return this.carsService.update(id, updateCar);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.carsService.delete(id);
    }
}
