import { Manufacturer, Owner } from '.';

export interface Car {
    id: string;
    manufacturer: Manufacturer;
    price: number;
    firstRegistrationDate: Date;
    owners: Array<Owner>;
}
