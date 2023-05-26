"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./user.dto");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(body) {
        try {
            const { login, name, password, surname } = body;
            const isCandidate = await this.userService.findUser(login);
            if (isCandidate) {
                return {
                    message: `Пользователь с таким ${login} эл.почтой уже существует`,
                    type: 'warn',
                    data: [],
                    register: false
                };
            }
            const result = await this.userService.createUser(login, password, name, surname);
            if (result.name.length) {
                return {
                    message: 'Регистрация прошла успешно',
                    type: 'success',
                    data: [],
                    register: true
                };
            }
            return {
                message: 'Ошибка не удалось зарегистрироваться',
                type: 'success',
                data: [],
                register: true
            };
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(body, res) {
        try {
            const { login: loginBody, password: passwordBody } = body;
            const user = await this.userService.findUser(loginBody);
            if (!user) {
                return res.status(303).json({
                    message: 'Неправильный логин или пароль',
                    type: 'success',
                    data: [],
                    token: ''
                });
            }
            const { password, name, login, _id, surname } = user;
            const isPassword = await this.userService.isPassword(passwordBody, password);
            if (!isPassword) {
                return res.status(303).json({
                    message: 'Неправильный логин или пароль',
                    type: 'success',
                    data: [],
                    token: ''
                });
            }
            const token = this.jwtService.sign({ _id, name, login, surname });
            res.status(202)
                .cookie('token', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
                .json({
                message: 'Авторизация прошла успешно',
                type: 'success',
                data: { name, login, _id, surname },
                token
            });
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async checkToken(req) {
        try {
            const { token } = req.cookies;
            const { authorization } = req.headers;
            if (!(authorization === null || authorization === void 0 ? void 0 : authorization.length)) {
                return {
                    message: 'Вы не авторизованы',
                    type: 'warn',
                    data: '',
                    token: ''
                };
            }
            const bearer = authorization.split(' ')[0];
            const str = authorization.split(' ')[1];
            if (!(bearer == 'Bearer' && str.length)) {
                return {
                    message: 'Вы не авторизованы',
                    type: 'warn',
                    data: '',
                    token: ''
                };
            }
            if (!token) {
                return {
                    message: 'Вы не авторизованы',
                    type: 'warn',
                    data: {},
                    token: ''
                };
            }
            const data = this.jwtService.verify(token);
            const user = await this.userService.findUser(data.login);
            if (!user) {
                return {
                    message: 'Вы не авторизованы',
                    type: 'warn',
                    data: {},
                    token: ''
                };
            }
            const { login, name, _id, surname } = user;
            return {
                message: 'Авторизация прошла успешно',
                type: 'success',
                data: { login, name, _id, surname },
                token
            };
        }
        catch (e) {
            console.log(e);
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async logout(res) {
        try {
            res.status(200).clearCookie('token').json({
                message: 'Вы вышли',
                type: 'success',
                data: [],
                logout: true
            });
        }
        catch (e) {
            throw new common_1.HttpException('Ошибка в сервере', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('check-token'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkToken", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map