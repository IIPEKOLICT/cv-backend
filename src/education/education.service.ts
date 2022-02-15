import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Education } from './education';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { EducationDto } from './dto/education.dto';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>
  ) {}

  getAll(): Observable<Education[]> {
    return from(this.educationRepository.find());
  }

  async getOne(id: number): Promise<Education> {
    return this.educationRepository.findOne({ id });
  }

  create(dto: EducationDto): Observable<Education> {
    return from(
      this.educationRepository.save(this.educationRepository.create({ ...dto }))
    );
  }

  change(id: number, dto: EducationDto): Observable<Education> {
    return from(this.educationRepository.update(id, { ...dto })).pipe(
      switchMap(() => from(this.getOne(id)))
    );
  }

  delete(id: number): Observable<DeleteResponseDto> {
    return from(this.educationRepository.delete({ id })).pipe(
      map(() => ({ id }))
    );
  }
}
