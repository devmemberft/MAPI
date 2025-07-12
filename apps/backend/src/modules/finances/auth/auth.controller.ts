import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterUserAccessKeyDto } from "./dto/register.dto";
import { KeyAuthService } from "./auth.service";
import { loginUserAccessKeyDto } from "./dto/login.dto";

@Controller('finances/auth')
export class KeyAuthController{
    constructor(private readonly keyAuthService:KeyAuthService){}

    @Get('captcha')
    getCaptcha() { return this.keyAuthService.generateCaptcha(); }

    @Post('register')
    async register(@Body() body: RegisterUserAccessKeyDto){
        const {captcha_id, captcha_value} = body;
        const valid = this.keyAuthService.verifyCaptcha(captcha_id,captcha_value);

        if(!valid) throw new BadRequestException(`Invalid Captcha code.`);
        return this.keyAuthService.registerNewAccessKeyUser();
    }

    @Post('login')
    async login(@Body() {access_key}:loginUserAccessKeyDto){
        const user = await this.keyAuthService.loginUserAccessKey(access_key);
        if(!user) { throw new BadRequestException(`Invalid access key. `); }
        //JWT
        return {success:true};
    }
}