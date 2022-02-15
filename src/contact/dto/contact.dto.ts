import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly link: string;
}
