import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findUser(email: string): Promise<UserDocument>;
    createUser(email: string, password: string, name: string): Promise<User>;
    isPassword(password: string, hashPassword: string): Promise<boolean>;
}
