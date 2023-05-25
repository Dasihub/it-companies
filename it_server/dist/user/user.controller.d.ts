import { LoginUserDto, RegisterUserDto } from './user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(body: RegisterUserDto): Promise<{
        message: string;
        type: string;
        data: any[];
        register: boolean;
    }>;
    login(body: LoginUserDto, res: any): Promise<any>;
    checkToken(req: any): Promise<{
        message: string;
        type: string;
        data: string;
        token: string;
    } | {
        message: string;
        type: string;
        data: {
            email?: undefined;
            name?: undefined;
            _id?: undefined;
        };
        token: string;
    } | {
        message: string;
        type: string;
        data: {
            email: string;
            name: string;
            _id: any;
        };
        token: any;
    }>;
    logout(res: any): Promise<void>;
}
