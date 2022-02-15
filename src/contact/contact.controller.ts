import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Field, Route } from '../shared/enums';
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';
import { Contact } from './contact';
import { ContactDto } from './dto/contact.dto';
import { FileService } from '../file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactOperation, TechnologyOperation } from '../shared/docs';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@ApiTags(Route.Contact)
@Controller(Route.Contact)
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly fileService: FileService
  ) {}

  @ApiOperation({ summary: TechnologyOperation.Get })
  @ApiResponse({ type: [Contact] })
  @Get()
  getAll(): Observable<Contact[]> {
    return this.contactService.getAll();
  }

  @ApiOperation({ summary: ContactOperation.Create })
  @ApiResponse({ type: Contact })
  @Auth()
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor(Field.Icon))
  async create(
    @Body() dto: ContactDto,
    @UploadedFile() image?: Express.Multer.File
  ): Promise<Observable<Contact>> {
    const icon = await this.fileService.create(image);
    return this.contactService.create(dto, icon);
  }

  @ApiOperation({ summary: ContactOperation.Change })
  @ApiResponse({ type: Contact })
  @Auth()
  @UseGuards(AuthGuard)
  @Put(`:${Field.Id}`)
  @UseInterceptors(FileInterceptor(Field.Icon))
  async change(
    @Param(Field.Id) id: number,
    @Body() dto: ContactDto,
    @UploadedFile() image?: Express.Multer.File
  ): Promise<Observable<Contact>> {
    const icon = await this.fileService.create(image);
    return this.contactService.change(id, dto, icon);
  }

  @ApiOperation({ summary: ContactOperation.Delete })
  @ApiResponse({ type: Number })
  @Auth()
  @UseGuards(AuthGuard)
  @Delete(`:${Field.Id}`)
  delete(
    @Param(Field.Id, ParseIntPipe) id: number
  ): Observable<DeleteResponseDto> {
    return this.contactService.delete(id);
  }
}
