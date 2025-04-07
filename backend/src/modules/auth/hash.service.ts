import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    private readonly saltRounds = 10;

    async hashPassword(password:string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return bcrypt.hash(password,salt);
    }

    async comparePassword(password:string, hash:string):Promise<boolean> {
        const match = await bcrypt.compare(password,hash);

        if(match) { return true }

        return false;
    }
}