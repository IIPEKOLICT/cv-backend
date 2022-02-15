import { Module } from '@nestjs/common';
import { TechnologyController } from './technology.controller';
import { TechnologyService } from './technology.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from './technology';
import { FileService } from '../file/file.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Technology]), AuthModule],
  controllers: [TechnologyController],
  providers: [TechnologyService, FileService],
})
export class TechnologyModule {}
