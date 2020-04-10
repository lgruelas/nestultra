import { Manufacturer, Owner } from './../interfaces';

export class UpdateCarDto {
    manufacturer: Manufacturer;
    price: number;
    firstRegistrationDate: Date;
    owners: Array<Owner>;
}