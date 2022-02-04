import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, ValidationPipe,
} from '@nestjs/common';
import { Field, Route } from '../shared/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { Observable } from 'rxjs';
import { Education } from './education';
import { EducationOperation } from '../shared/docs';
import { EducationDto } from './dto/education.dto';

@ApiTags(Route.Education)
@Controller(Route.Education)
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @ApiOperation({ summary: EducationOperation.Get })
  @ApiResponse({ type: [Education] })
  @Get()
  getAll(): Observable<Education[]> {
    return this.educationService.getAll();
  }

  @ApiOperation({ summary: EducationOperation.Create })
  @ApiResponse({ type: Education })
  @Post()
  create(@Body() dto: EducationDto): Observable<Education> {
    return this.educationService.create(dto);
  }

  @ApiOperation({ summary: EducationOperation.Change })
  @ApiResponse({ type: Education })
  @Put(`:${Field.Id}`)
  change(
    @Param(Field.Id) id: number,
    @Body() dto: EducationDto,
  ): Observable<Education> {
    return this.educationService.change(id, dto);
  }

  @ApiOperation({ summary: EducationOperation.Delete })
  @ApiResponse({ type: Number })
  @Delete(`:${Field.Id}`)
  delete(@Param(Field.Id) id: number): Observable<number> {
    return this.educationService.delete(id);
  }
}