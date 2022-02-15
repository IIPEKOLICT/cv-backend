import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty() readonly token: string;
}
