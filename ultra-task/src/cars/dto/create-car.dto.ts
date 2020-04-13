import { ManufacturerDto } from './manufacturer.dto';
import { OwnerDto } from './owner.dto';

export class CreateCarDto {
    manufacturer: ManufacturerDto;
    price: number;
    owners: Array<OwnerDto>;
}