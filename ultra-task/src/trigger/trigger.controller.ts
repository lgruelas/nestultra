import { Controller, Get } from '@nestjs/common';
import { TriggerService } from './trigger.service';

@Controller('trigger')
export class TriggerController {
    constructor(private readonly triggerService: TriggerService) {}

    @Get()
    trigger(): void {
        this.triggerService.triggerEvent();
    }
}
