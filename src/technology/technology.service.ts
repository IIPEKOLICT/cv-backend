import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Technology } from './technology';
import { Repository } from 'typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { TechnologyDto } from './dto/technology.dto';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@Injectable()
export class TechnologyService {
  constructor(
    @InjectRepository(Technology)
    private readonly techRepository: Repository<Technology>
  ) {}

  getAll(): Observable<Technology[]> {
    return from(this.techRepository.find());
  }

  async getOne(id: number): Promise<Technology> {
    return this.techRepository.findOne({ id });
  }

  async getTechnologies(ids: number[]): Promise<Technology[]> {
    const technologies: Technology[] = [];

    for (const id of ids) {
      const technology: Technology = await this.getOne(id);
      technologies.push(technology);
    }

    return technologies;
  }

  create(dto: TechnologyDto, icon: string): Observable<Technology> {
    return from(
      this.techRepository.save(this.techRepository.create({ ...dto, icon }))
    );
  }

  change(id: number, dto: TechnologyDto, icon: string): Observable<Technology> {
    const updatedFields: TechnologyDto & { icon?: string } = dto;

    if (icon) {
      updatedFields.icon = icon;
    }

    return from(this.techRepository.update({ id }, { ...updatedFields })).pipe(
      switchMap(() => from(this.getOne(id)))
    );
  }

  delete(id: number): Observable<DeleteResponseDto> {
    return from(this.techRepository.delete({ id })).pipe(map(() => ({ id })));
  }
}
