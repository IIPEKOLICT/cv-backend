import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Field, Route } from '../shared/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TechnologyService } from './technology.service';
import { Observable } from 'rxjs';
import { Technology } from './technology';
import { TechnologyOperation } from '../shared/docs';
import { FileInterceptor } from '@nestjs/platform-express';
import { TechnologyDto } from './dto/technology.dto';
import { ContactDto } from '../contact/dto/contact.dto';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@ApiTags(Route.Technology)
@Controller(Route.Technology)
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @ApiOperation({ summary: TechnologyOperation.Get })
  @ApiResponse({ type: [Technology] })
  @Get()
  getAll(): Observable<Technology[]> {
    return this.technologyService.getAll();
  }

  @ApiOperation({ summary: TechnologyOperation.Create })
  @ApiResponse({ type: Technology })
  @Auth()
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor(Field.Icon))
  create(@Body() dto: TechnologyDto): Observable<Technology> {
    return this.technologyService.create(dto);
  }

  @ApiOperation({ summary: TechnologyOperation.Change })
  @ApiResponse({ type: Technology })
  @Auth()
  @UseGuards(AuthGuard)
  @Put(`:${Field.Id}`)
  change(
    @Param(Field.Id) id: number,
    @Body() dto: ContactDto
  ): Observable<Technology> {
    return this.technologyService.change(id, dto);
  }

  @ApiOperation({ summary: TechnologyOperation.Delete })
  @ApiResponse({ type: DeleteResponseDto })
  @Auth()
  @UseGuards(AuthGuard)
  @Delete(`:${Field.Id}`)
  delete(@Param(Field.Id, ParseIntPipe) id: number): Observable<DeleteResponseDto> {
    return this.technologyService.delete(id);
  }
}
