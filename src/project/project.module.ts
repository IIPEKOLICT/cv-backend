import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project';
import { Technology } from '../technology/technology';
import { AuthModule } from '../auth/auth.module';
import { FileService } from '../file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Technology]), AuthModule],
  controllers: [ProjectController],
  providers: [ProjectService, FileService],
})
export class ProjectModule {}
