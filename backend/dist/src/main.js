"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const express_session_1 = __importDefault(require("express-session"));
const database_initializer_service_1 = require("./database/database-initializer.service");
const validation_options_1 = __importDefault(require("./utils/validation-options"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3002',
            'https://nobleassetmarkets.com',
            'https://quantureinc.netlify.app',
        ],
        credentials: true,
    });
    app.use((0, express_session_1.default)({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 36000000 },
    }));
    const configService = app.get((config_1.ConfigService));
    app.setGlobalPrefix(configService.getOrThrow('app.apiPrefix', { infer: true }), {
        exclude: ['/'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe(validation_options_1.default));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Connector')
        .setDescription('Intuitive API for various web activities')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Auth', 'Endpoints related to authentication')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
    const databaseInitializerService = app.get(database_initializer_service_1.DatabaseInitializerService);
    await databaseInitializerService.onModuleInit();
    try {
        const PORT = process.env.PORT || 3000;
        await app.listen(PORT, () => {
            console.log(`Running on Port ${PORT}`);
            console.log(`Running in ${configService.getOrThrow('app.nodeEnv', {
                infer: true,
            })} `);
        });
    }
    catch (err) {
        console.log(err);
    }
}
void bootstrap();
//# sourceMappingURL=main.js.map