import { IsString } from "class-validator";

export class DeleteAccountDto {
    @IsString()
    access_key:string;
}