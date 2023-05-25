"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bootstrap = async () => {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const PORT = process.env.PORT;
        app.setGlobalPrefix('api');
        app.use(cookieParser());
        await app.listen(PORT, () => console.log(`Server is working in port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
};
bootstrap();
//# sourceMappingURL=main.js.map