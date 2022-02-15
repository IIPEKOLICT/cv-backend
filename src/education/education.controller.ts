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
import { EducationService } from './education.service';
import { Observable } from 'rxjs';
import { Education } from './education';
import { EducationOperation } from '../shared/docs';
import { EducationDto } from './dto/education.dto';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { DeleteResponseDto } from '../shared/delete-response.dto';

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
  @Auth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: EducationDto): Observable<Education> {
    return this.educationService.create(dto);
  }

  @ApiOperation({ summary: EducationOperation.Change })
  @ApiResponse({ type: Education })
  @Auth()
  @UseGuards(AuthGuard)
  @Put(`:${Field.Id}`)
  change(
    @Param(Field.Id) id: number,
    @Body() dto: EducationDto
  ): Observable<Education> {
    return this.educationService.change(id, dto);
  }

  @ApiOperation({ summary: EducationOperation.Delete })
  @ApiResponse({ type: DeleteResponseDto })
  @Auth()
  @UseGuards(AuthGuard)
  @Delete(`:${Field.Id}`)
  delete(
    @Param(Field.Id, ParseIntPipe) id: number
  ): Observable<DeleteResponseDto> {
    return this.educationService.delete(id);
  }
}
