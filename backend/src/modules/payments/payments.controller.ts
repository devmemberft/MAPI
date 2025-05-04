import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RegisterPaymentDto } from './dto/register-payment.dto';


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

    @Get(':payment_id')
    async getPaymentById(@Param('payment_id') payment_id:string){
        return await this.paymentsService.findPaymentById(payment_id);
    }

    @Delete('delete')
    async deletePayment(@Param('payment_id') payment_id:string){
        return await this.paymentsService.deletePayment(payment_id);
    }
}
