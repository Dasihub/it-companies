"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
class AuthGuard {
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const { token } = req.cookies;
        const { authorization } = req.headers;
        if (!(authorization === null || authorization === void 0 ? void 0 : authorization.length)) {
            throw new common_1.UnauthorizedException({ message: 'Вы не автозиваны', type: 'warn', data: [] });
        }
        const bearer = authorization.split(' ')[0];
        const str = authorization.split(' ')[1];
        if (!(bearer == 'Bearer' && str.length)) {
            throw new common_1.UnauthorizedException({ message: 'Вы не автозиваны', type: 'warn', data: [] });
        }
        if (!token) {
            throw new common_1.UnauthorizedException({ message: 'Вы не автозиваны', type: 'warn', data: [] });
        }
        return true;
    }
}
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map