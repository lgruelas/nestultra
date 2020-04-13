import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CarsController } from "./cars.controller";
import { CarsService } from "./cars.service";
import { CarEntity } from "./entities/car.entity";
import { ManufacturerEntity } from "./entities/manufacturer.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CarEntity, ManufacturerEntity])],
    controllers: [CarsController],
    providers: [CarsService],
    exports: [TypeOrmModule]
})
export class CarsModule {}