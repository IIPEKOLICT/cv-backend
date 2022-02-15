import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './cv';
import { Contact } from '../contact/contact';
import { Education } from '../education/education';
import { Employment } from '../employment/employment';
import { Technology } from '../technology/technology';
import { Project } from '../project/project';
import { FileService } from '../file/file.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cv,
      Contact,
      Education,
      Employment,
      Project,
      Technology,
    ]),
    AuthModule,
  ],
  controllers: [CvController],
  providers: [CvService, FileService],
})
export class CvModule {}
