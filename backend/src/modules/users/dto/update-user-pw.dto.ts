import { IsString, IsNotEmpty, Matches, MaxLength, MinLength  } from 'class-validator'   

export class UpdateUserPasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/(?=.*[0-9])/, {message: 'Password must contain at least one number'})
    @Matches(/(?=.*[A-Z])/, {message: 'Password must contain at least one uppercase letter'})
    old_password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/(?=.*[0-9])/, {message: 'Password must contain at least one number'})
    @Matches(/(?=.*[A-Z])/, {message: 'Password must contain at least one uppercase letter'})
    new_password: string;
}