"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// wedding-backend/src/main.ts
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
function parseCorsOrigins(raw) {
    if (!raw || !raw.trim())
        return [/^http:\/\/localhost:\d+$/];
    return raw.split(',').map(s => s.trim()).filter(Boolean).map(v => v.startsWith('/') && v.endsWith('/') ? new RegExp(v.slice(1, -1)) : v);
}
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    const corsOrigins = parseCorsOrigins(process.env.CORS_ORIGIN);
    app.enableCors({ origin: corsOrigins });
    const PORT = parseInt(process.env.PORT || '3000', 10);
    const HOST = process.env.HOST || '0.0.0.0';
    await app.listen(PORT, HOST);
    logger.log(`API listening on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}/api`);
    logger.log(`CORS origins: ${corsOrigins.map(o => o instanceof RegExp ? o.toString() : o).join(', ') || '(localhost only)'}`);
}
bootstrap();
//# sourceMappingURL=main.js.map