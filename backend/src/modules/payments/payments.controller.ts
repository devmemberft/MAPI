import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RegisterPaymentDto } from './dto/create-payment.dto';


@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService:PaymentsService){}

    @Get('daily-route')
    async getDailyRoute(){
        return await this.paymentsService.buildDailyRoute();
    }

    @Post('register')
    async registerPayment(@Body() registerPaymentDto:RegisterPaymentDto){
        return await this.paymentsService.registerClientPayment(registerPaymentDto);
    }

    @Post('postpone')
    async postponePayment(@Body() registerPaymentDto:RegisterPaymentDto){
        return await this.paymentsService.postponePayment(registerPaymentDto);
    }
}
