/* eslint-disable prettier/prettier */
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from './config/config.type';
import session from 'express-session';
import { DatabaseInitializerService } from './database/database-initializer.service';
import validationOptions from './utils/validation-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3002',
      'https://nobleassetmarkets.com',
      'https://quantureinc.netlify.app',
    ],
    credentials: true,
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 36000000 },
    }),
  );

  const configService = app.get(ConfigService<AllConfigType>);

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  app.useGlobalPipes(new ValidationPipe(validationOptions));

  const options = new DocumentBuilder()
    .setTitle('Connector')
    .setDescription('Intuitive API for various web activities')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Endpoints related to authentication')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const databaseInitializerService = app.get(DatabaseInitializerService);
  await databaseInitializerService.onModuleInit();

  try {
    // const PORT = configService.getOrThrow('app.port', { infer: true });
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, () => {
      console.log(`Running on Port ${PORT}`);
      console.log(
        `Running in ${configService.getOrThrow('app.nodeEnv', {
          infer: true,
        })} `,
      );
    });
  } catch (err) {
    console.log(err);
  }
}
void bootstrap();
