import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Field, Route } from '../shared/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmploymentService } from './employment.service';
import { Observable } from 'rxjs';
import { Employment } from './employment';
import { EmploymentOperation } from '../shared/docs';
import { EmploymentDto } from './dto/employment.dto';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@ApiTags(Route.Employment)
@Controller(Route.Employment)
export class EmploymentController {
  constructor(private readonly employmentService: EmploymentService) {}

  @ApiOperation({ summary: EmploymentOperation.Get })
  @ApiResponse({ type: [Employment] })
  @Get()
  getAll(): Observable<Employment[]> {
    return this.employmentService.getAll();
  }

  @ApiOperation({ summary: EmploymentOperation.Create })
  @ApiResponse({ type: Employment })
  @Auth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: EmploymentDto): Observable<Employment> {
    return this.employmentService.create(dto);
  }

  @ApiOperation({ summary: EmploymentOperation.Change })
  @ApiResponse({ type: Employment })
  @Auth()
  @UseGuards(AuthGuard)
  @Put(`:${Field.Id}`)
  change(
    @Param(Field.Id) id: number,
    @Body() dto: EmploymentDto
  ): Observable<Employment> {
    return this.employmentService.change(id, dto);
  }

  @ApiOperation({ summary: EmploymentOperation.Delete })
  @ApiResponse({ type: DeleteResponseDto })
  @Auth()
  @UseGuards(AuthGuard)
  @Delete(`:${Field.Id}`)
  delete(
    @Param(Field.Id, ParseIntPipe) id: number
  ): Observable<DeleteResponseDto> {
    return this.employmentService.delete(id);
  }
}
