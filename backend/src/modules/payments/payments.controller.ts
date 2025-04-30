import { Controller, Get, Query, Patch, Param, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { GetTodayPaymentsDto } from './dto/get-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService:PaymentsService){}

    @Get('today')
    getTodayPayments(@Query() filters: GetTodayPaymentsDto){
        return this.paymentsService.getTodayPayments(filters);
    }

    /*
    @Patch(':id')
    updatePayment(@Param('id') id:string, @Body() dto:UpdatePaymentDto){
        return this.paymentsService.updatePayment(id,dto);
    }
    */
}
