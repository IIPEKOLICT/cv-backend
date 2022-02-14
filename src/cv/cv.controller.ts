import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { Field, Route } from '../shared/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CvService } from './cv.service';
import { Observable } from 'rxjs';
import { Cv } from './cv';
import { CvOperation } from '../shared/docs';
import { CvDto } from './dto/cv.dto';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@ApiTags(Route.Cv)
@Controller(Route.Cv)
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @ApiOperation({ summary: CvOperation.GetAll })
  @ApiResponse({ type: [Cv] })
  @Get()
  getAll(): Observable<Cv[]> {
    return this.cvService.getAll();
  }

  @ApiOperation({ summary: CvOperation.GetCurrent })
  @ApiResponse({ type: Cv })
  @Get(`:${Field.Id}`)
  getCurrent(@Param(Field.Id) id: number): Observable<Cv> {
    return this.cvService.getCurrent(id);
  }

  @ApiOperation({ summary: CvOperation.Create })
  @ApiResponse({ type: Cv })
  @Auth()
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CvDto): Observable<Cv> {
    return this.cvService.create(dto);
  }

  @ApiOperation({ summary: CvOperation.Change })
  @ApiResponse({ type: Cv })
  @Auth()
  @UseGuards(AuthGuard)
  @Put(`:${Field.Id}`)
  async change(
    @Param(Field.Id) id: number,
    @Body() dto: CvDto
  ): Promise<Observable<Cv>> {
    return this.cvService.change(id, dto);
  }

  @ApiOperation({ summary: CvOperation.Delete })
  @ApiResponse({ type: DeleteResponseDto })
  @Auth()
  @UseGuards(AuthGuard)
  @Delete(`:${Field.Id}`)
  delete(@Param(Field.Id, ParseIntPipe) id: number): Observable<DeleteResponseDto> {
    return this.cvService.delete(id);
  }
}
