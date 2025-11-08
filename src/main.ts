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
    origin: true, //["https://coin.rawtechroots.cloud"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
    
  })
  const port = process.env.PORT || 1908;
  await app.listen(port, '0.0.0.0');
  console.log(`App running in port ${port}`)
}
bootstrap();
