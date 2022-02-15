import { ApiProperty } from '@nestjs/swagger';
import { Technology } from '../../technology/technology';

export class ProjectDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly description: string;
  @ApiProperty() readonly deploy: string;
  @ApiProperty() readonly repo: string;
  @ApiProperty({ type: [Technology] }) readonly technologies: Technology[];
}
