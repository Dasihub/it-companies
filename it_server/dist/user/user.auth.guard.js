"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthGuard = void 0;
const common_1 = require("@nestjs/common");
class UserAuthGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { token } = req.cookies;
        const { authorization } = req.headers;
        if (!(authorization === null || authorization === void 0 ? void 0 : authorization.length)) {
            throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы 1', type: 'warn', data: [] });
        }
        const bearer = authorization.split(' ')[0];
        const str = authorization.split(' ')[1];
        if (!(bearer == 'Bearer' && str.length)) {
            throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы 2', type: 'warn', data: [] });
        }
        if (!token) {
            throw new common_1.UnauthorizedException({ message: 'Вы не авторизованы 3', type: 'warn', data: [] });
        }
        return true;
    }
}
exports.UserAuthGuard = UserAuthGuard;
//# sourceMappingURL=user.auth.guard.js.map