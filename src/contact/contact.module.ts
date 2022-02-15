import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact';
import { FileService } from '../file/file.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), AuthModule],
  controllers: [ContactController],
  providers: [ContactService, FileService],
})
export class ContactModule {}
