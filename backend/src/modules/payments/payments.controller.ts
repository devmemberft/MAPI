import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RegisterPaymentDto } from './dto/register-payment.dto';
import { PostponePaymentDto } from './dto/postpone-payment.dto';


@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService:PaymentsService){}

    @Get('daily-route')
    async getDailyRoute(){
        return await this.paymentsService.buildDailyRoute();
    }

    @Post('register/:sale_id')
    async registerPayment(@Param('sale_id') sale_id:string, @Body() registerPaymentDto:RegisterPaymentDto){
        return await this.paymentsService.registerClientPayment(sale_id,registerPaymentDto);
    }

    @Post('postpone/:sale_id')
    async postponePayment(@Param('sale_id') sale_id:string,@Body() postponePaymentDto:PostponePaymentDto){
        return await this.paymentsService.postponePayment(sale_id,postponePaymentDto);
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
