import { BadRequestException, Body, Controller, Get, Post, Res } from "@nestjs/common";
import { RegisterUserAccessKeyDto } from "./dto/register.dto";
import { KeyAuthService } from "./auth.service";
import { loginUserAccessKeyDto } from "./dto/login.dto";
import { UserService } from "../users/user.service";
import { Response } from "express";

// regex validation for access keys
function isValidAccessKeyFormat(key:string):boolean{
    return /^[A-F0-9]{4}(-[A-F0-9]{4}){4}$/.test(key.toUpperCase());
}


@Controller('finances/auth')
export class KeyAuthController{
    constructor(
        private readonly keyAuthService:KeyAuthService,
        private readonly userService:UserService,
    ){}

    @Get('captcha')
    getCaptcha() { return this.keyAuthService.generateCaptcha(); }

    @Post('register')
    async register(@Body() body: RegisterUserAccessKeyDto){
        const {captcha_value} = body;
        const valid = this.keyAuthService.verifyCaptcha(captcha_value);
        if(!valid) throw new BadRequestException(`Invalid Captcha code, ${valid} is not equal to ${captcha_value}`);

        const result = this.keyAuthService.registerNewAccessKeyUser();
        return { success:true, ...result};
    }

    @Post('login')
    async login(@Body() {access_key}:loginUserAccessKeyDto){
        // formatting validation
        if(!isValidAccessKeyFormat(access_key) || access_key.length != 24){ throw new BadRequestException(`Access key format is invalid.`); }
        
        
        const user = await this.keyAuthService.loginUserAccessKey(access_key);
        if(!user) { throw new BadRequestException(`Invalid access key. `); }
        
        
        await this.userService.markAccessKeyAsUsed(user.user_id);
        
        //JWT
        const token = await this.keyAuthService.generateJwt(user);
        return {success:true, access_token:token, user_id:user.user_id};
    }

    @Post('logout')
    async logout(@Res({passthrough:true}) res:Response){
        res.clearCookie('access_token');
        return { message: 'Logged out.'};
    }
}