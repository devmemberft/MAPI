import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true,
    })
  )

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: "http://localhost:3000",
    credentials:true,
  })
  const port = process.env.PORT || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`App running in port ${process.env.PORT}`)
}
bootstrap();
