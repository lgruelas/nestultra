import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { CarsModule } from './cars/cars.module';
import { CarEntity } from './cars/entities/car.entity';
import { OwnerEntity } from './cars/entities/owner.entity';
import { ManufacturerEntity } from './cars/entities/manufacturer.entity';
import { TriggerController } from './trigger/trigger.controller';
import { TriggerService } from './trigger/trigger.service';

Logger.log(`Running on port ${process.env}`, 'Bootstrap');
@Module({
  imports: [TypeOrmModule.forRoot({
        "type": "postgres",
        "host": process.env.DB_HOST || "localhost",
        "port": process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        "username": process.env.DB_USER || "postgres",
        "password": process.env.DB_PASSWORD || "",
        "database": process.env.DATABASE || "ultra",
        "entities": [CarEntity, OwnerEntity, ManufacturerEntity],
        "synchronize": true,
        "logging": true
    }), CarsModule],
  controllers: [AppController, CarsController, TriggerController],
  providers: [AppService, CarsService, TriggerService],
})
export class AppModule {}
