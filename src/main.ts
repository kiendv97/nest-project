import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const optionsConfigs = { cors: true }
  const app = await NestFactory.create(AppModule, optionsConfigs);
  app.setGlobalPrefix('api')
  const options = new DocumentBuilder()
    .setTitle('Nest document example test by DvKien')
    .setDescription('Hihi')
    .setVersion('1.0')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
  
  await app.listen(3000);
}
bootstrap();
