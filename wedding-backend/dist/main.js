"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const origin = process.env.CORS_ORIGIN?.split(',').map(s => s.trim()) ?? [/^http:\/\/localhost:\d+$/];
    app.enableCors({ origin });
    await app.listen(parseInt(process.env.PORT || '3000', 10));
    console.log('API on http://localhost:' + (process.env.PORT || '3000') + '/api');
}
bootstrap();
//# sourceMappingURL=main.js.map