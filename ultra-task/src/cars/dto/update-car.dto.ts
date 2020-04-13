import { ManufacturerDto } from "./manufacturer.dto";
import { OwnerDto } from "./owner.dto";

export class UpdateCarDto {
    price?: number;
    firstRegistrationDate?: Date;
    manufacturer?: ManufacturerDto;
    owners?: Array<OwnerDto>;
}