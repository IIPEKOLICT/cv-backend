import { ApiProperty } from '@nestjs/swagger';
import { Contact } from '../../contact/contact';
import { Education } from '../../education/education';
import { Employment } from '../../employment/employment';
import { Project } from '../../project/project';
import { Technology } from '../../technology/technology';

export class CvDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly job: string;
  @ApiProperty() readonly about: string;
  @ApiProperty() readonly english: string;
  @ApiProperty({ type: [Contact] }) readonly contacts: Contact[];
  @ApiProperty({ type: [Education] }) readonly educations: Education[];
  @ApiProperty({ type: [Employment] }) readonly employments: Employment[];
  @ApiProperty({ type: [Project] }) readonly projects: Project[];
  @ApiProperty({ type: [Technology] }) readonly technologies: Technology[];
}
