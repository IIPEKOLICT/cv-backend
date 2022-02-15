import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact';
import { from, map, Observable, switchMap } from 'rxjs';
import { ContactDto } from './dto/contact.dto';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>
  ) {}

  async getOne(id: number): Promise<Contact> {
    return this.contactRepository.findOne({ id });
  }

  getAll(): Observable<Contact[]> {
    return from(this.contactRepository.find());
  }

  create(dto: ContactDto, icon: string): Observable<Contact> {
    return from(
      this.contactRepository.save(
        this.contactRepository.create({ ...dto, icon })
      )
    );
  }

  change(id: number, dto: ContactDto, icon: string): Observable<Contact> {
    const updatedFields: ContactDto & { icon?: string } = dto;

    if (icon) {
      updatedFields.icon = icon;
    }

    return from(
      this.contactRepository.update({ id }, { ...updatedFields })
    ).pipe(switchMap(() => from(this.getOne(id))));
  }

  delete(id: number): Observable<DeleteResponseDto> {
    return from(this.contactRepository.delete({ id })).pipe(
      map(() => ({ id }))
    );
  }
}
