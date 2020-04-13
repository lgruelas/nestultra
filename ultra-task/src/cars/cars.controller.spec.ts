import { Test, TestingModule } from '@nestjs/testing';

import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

const mockCarService = () => ({

});

describe('Cars Controller', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [{provide: CarsService, useFactory: mockCarService}]
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
