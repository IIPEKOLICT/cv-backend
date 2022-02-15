import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CV api reference')
  .setDescription('The CV API description')
  .setVersion('1.0')
  .build();
