import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly text: string;
  @ApiProperty() readonly link: string;
  @ApiProperty() icon: string;
}
