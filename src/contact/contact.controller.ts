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
import { ContactService } from './contact.service';
import { Observable } from 'rxjs';
import { Contact } from './contact';
import { ContactDto } from './dto/contact.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactOperation } from '../shared/docs';
import { Auth } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@ApiTags(Route.Contact)
@Controller(Route.Contact)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: ContactOperation.Get })
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
  create(@Body() dto: ContactDto): Observable<Contact> {
    return this.contactService.create(dto);
  }

  @ApiOperation({ summary: ContactOperation.Change })
  @ApiResponse({ type: Contact })
  @Auth()
  @UseGuards(AuthGuard)
  @Put(`:${Field.Id}`)
  change(@Param(Field.Id) id: number, @Body() dto: ContactDto): Observable<Contact> {
    return this.contactService.change(id, dto);
  }

  @ApiOperation({ summary: ContactOperation.Delete })
  @ApiResponse({ type: DeleteResponseDto })
  @Auth()
  @UseGuards(AuthGuard)
  @Delete(`:${Field.Id}`)
  delete(@Param(Field.Id, ParseIntPipe) id: number): Observable<DeleteResponseDto> {
    return this.contactService.delete(id);
  }
}
