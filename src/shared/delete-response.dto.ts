import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseDto {
  @ApiProperty() readonly id: number;
}
