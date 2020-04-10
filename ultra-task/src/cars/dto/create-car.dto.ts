import { Manufacturer, Owner } from './../interfaces';

export class CreateCarDto {
    manufacturer: Manufacturer;
    price: number;
    firstRegistrationDate: Date;
    owners: Array<Owner>;
}