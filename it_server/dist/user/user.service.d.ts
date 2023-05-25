import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findUser(login: string): Promise<UserDocument>;
    createUser(login: string, password: string, name: string, surname: string): Promise<User>;
    isPassword(password: string, hashPassword: string): Promise<boolean>;
}
