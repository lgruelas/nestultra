import { Controller, Get, Post } from '@nestjs/common';
import { TriggerService } from './trigger.service';

@Controller('trigger')
export class TriggerController {
    constructor(private readonly triggerService: TriggerService) {}

    @Get()
    trigger(): void {
        this.triggerService.triggerEvent();
    }

    @Post("/populate")
    populate(): void{
        this.triggerService.triggerPopulate();
    }
}
