import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { CarsService } from './cars.service';
import { CarEntity } from './entities/car.entity';
import { CreateCarDto, UpdateCarDto } from './dto';
import { ManufacturerEntity } from './entities/manufacturer.entity';
import { OwnerEntity } from './entities/owner.entity';

const mockCarRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
});


describe('CarsService', () => {
  let service: CarsService;
  let carRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        { provide: getRepositoryToken(CarEntity), useFactory: mockCarRepository }
      ],
    }).compile();

    service = await module.get<CarsService>(CarsService);
    carRepository = await module.get(getRepositoryToken(CarEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCar', () => {
    it('Sends one car to be created to the repository', async () => {
      carRepository.save.mockResolvedValue("someValue");

      expect(carRepository.save).not.toHaveBeenCalled();
      const carDto: CreateCarDto = {
        price: 2250,
        manufacturer: {
            name: "manufacturer1",
            siret: 34,
            phone: "35"
        },
        owners: [{
          name: "owner1"
        }]
      };
      const car: CarEntity = new CarEntity();
      const manufacturer = new ManufacturerEntity();
      manufacturer.name = carDto.manufacturer.name;
      manufacturer.phone = carDto.manufacturer.phone;
      manufacturer.siret = carDto.manufacturer.siret;
      const owners = carDto.owners.map(ownerDto => {
          const owner = new OwnerEntity();
          owner.name = ownerDto.name;
          return owner;
      });
      car.price = carDto.price;
      car.manufacturer = manufacturer;
      car.owners = owners;
      const result = await service.create(carDto);
      expect(carRepository.save).toHaveBeenCalledWith(car);
      expect(result).toEqual("someValue");
    });

    it('Did not create manufacturer when manufacturer id is sent', async () => {
      carRepository.save.mockResolvedValue("someValue");

      expect(carRepository.save).not.toHaveBeenCalled();
      const carDto: CreateCarDto = {
        price: 2250,
        manufacturer: {
            id: "someId",
            name: "manufacturer1",
            siret: 34,
            phone: "35"
        },
        owners: [{
          name: "owner1"
        }]
      };
      const car: CarEntity = new CarEntity();
      const manufacturer = new ManufacturerEntity();
      manufacturer.id = "someId";
      const owners = carDto.owners.map(ownerDto => {
          const owner = new OwnerEntity();
          owner.name = ownerDto.name;
          return owner;
      });
      car.price = carDto.price;
      car.manufacturer = manufacturer;
      car.owners = owners;
      const result = await service.create(carDto);
      expect(carRepository.save).toHaveBeenCalledWith(car);
      expect(result).toEqual("someValue");
    });
  });

  it('Did not create owner when owner id is sent', async () => {
    carRepository.save.mockResolvedValue("someValue");

    expect(carRepository.save).not.toHaveBeenCalled();
    const carDto: CreateCarDto = {
      price: 2250,
      manufacturer: {
          name: "manufacturer1",
          siret: 34,
          phone: "35"
      },
      owners: [{
        name: "owner1"
      },{
        id: "someId",
        name: "owner2"
      }]
    };
    const car: CarEntity = new CarEntity();
    const manufacturer = new ManufacturerEntity();
    manufacturer.name = carDto.manufacturer.name;
    manufacturer.phone = carDto.manufacturer.phone;
    manufacturer.siret = carDto.manufacturer.siret;
    const owners = carDto.owners.map(ownerDto => {
        const owner = new OwnerEntity();
        if (ownerDto.id) {
          owner.id = ownerDto.id;
        } else {
          owner.name = ownerDto.name;
        }
        return owner;
    });
    car.price = carDto.price;
    car.manufacturer = manufacturer;
    car.owners = owners;
    const result = await service.create(carDto);
    expect(carRepository.save).toHaveBeenCalledWith(car);
    expect(result).toEqual("someValue");
  });

  describe('FindAllCars', () => {
    it('Returns all the cars from the repository', async () => {
      carRepository.find.mockResolvedValue("someValue");

      expect(carRepository.find).not.toHaveBeenCalled();
      const result = await service.findAll();
      expect(carRepository.find).toHaveBeenCalledWith({relations: ["manufacturer", "owners"]});
      expect(result).toEqual("someValue");
    });
  });

  describe('FindOneCar', () => {
    it('Calls the repository method and return a value', async () => {
      carRepository.findOne.mockResolvedValue("someValue");

      expect(carRepository.findOne).not.toHaveBeenCalled();
      const result = await service.findOne("id");
      expect(carRepository.findOne).toHaveBeenCalledWith("id", {relations: ["manufacturer", "owners"]});
      expect(result).toEqual("someValue");
    });

    it('Throws exception if id does not exist', () => {
      carRepository.findOne.mockResolvedValue(null);

      expect(carRepository.findOne).not.toHaveBeenCalled();
      expect(service.findOne("2")).rejects.toThrow(NotFoundException);
    });
  });

  describe('DeleteOneCar', () => {
    it('calls the repository method', async () => {
      carRepository.delete.mockResolvedValue({affected: 1});

      expect(carRepository.delete).not.toHaveBeenCalled();
      await service.delete("id");
      expect(carRepository.delete).toHaveBeenCalledWith("id");
    });

    it('throws an exception if id does not exist', () => {
      carRepository.delete.mockResolvedValue({affected: 0});

      expect(carRepository.delete).not.toHaveBeenCalled();
      expect(service.delete("1")).rejects.toThrow(NotFoundException);
    });
  });

  describe('UpdateCar', () => {
    it('Updates car when there is no change in relations', async () => {
      const carDto: UpdateCarDto = {
        price: 23
      };

      expect(carRepository.update).not.toHaveBeenCalled();
      expect(carRepository.save).not.toHaveBeenCalled();
      await service.update("id", carDto);
      expect(carRepository.save).not.toHaveBeenCalled();
      expect(carRepository.update).toHaveBeenCalledWith("id", carDto);
    });

    it('Updates manufacturer when passed', async () => {
      const carDto: UpdateCarDto = {
        price: 23,
        manufacturer: {
          id: "someId",
          name: "name",
          siret: 2,
          phone: "phone"
        }
      };
      const car = new CarEntity();
      car.price = 23;
      car.id = "id";
      const manufacturer = new ManufacturerEntity();
      manufacturer.id = carDto.manufacturer.id;
      car.manufacturer = manufacturer;

      expect(carRepository.update).not.toHaveBeenCalled();
      expect(carRepository.save).not.toHaveBeenCalled();
      await service.update("id", carDto);
      expect(carRepository.update).not.toHaveBeenCalled();
      expect(carRepository.save).toHaveBeenCalledWith(car);
    });

    it('Updates owners list when passed', async () => {
      const carDto: UpdateCarDto = {
        price: 23,
        owners: [{
          id: "someId1",
          name: "owner1"
        },{
          id: "someId2",
          name: "owner2"
        }]
      };
      const car = new CarEntity();
      car.price = 23;
      car.id = "id";
      const owners = carDto.owners.map(ownerDto => {
        const owner = new OwnerEntity();
        owner.id = ownerDto.id;
        return owner;
      });
      car.owners = owners;

      expect(carRepository.update).not.toHaveBeenCalled();
      expect(carRepository.save).not.toHaveBeenCalled();
      await service.update("id", carDto);
      expect(carRepository.update).not.toHaveBeenCalled();
      expect(carRepository.save).toHaveBeenCalledWith(car);
    });
  });
});
