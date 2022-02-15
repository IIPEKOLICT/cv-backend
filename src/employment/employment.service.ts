import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employment } from './employment';
import { Repository } from 'typeorm';
import { from, map, Observable, switchMap } from 'rxjs';
import { EmploymentDto } from './dto/employment.dto';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@Injectable()
export class EmploymentService {
  constructor(
    @InjectRepository(Employment)
    private readonly employmentRepository: Repository<Employment>
  ) {}

  getAll(): Observable<Employment[]> {
    return from(this.employmentRepository.find());
  }

  getOne(id: number): Promise<Employment> {
    return this.employmentRepository.findOne({ id });
  }

  create(dto: EmploymentDto): Observable<Employment> {
    return from(
      this.employmentRepository.save(
        this.employmentRepository.create({ ...dto })
      )
    );
  }

  change(id: number, dto: EmploymentDto): Observable<Employment> {
    return from(this.employmentRepository.update({ id }, dto)).pipe(
      switchMap(() => from(this.getOne(id)))
    );
  }

  delete(id: number): Observable<DeleteResponseDto> {
    return from(this.employmentRepository.delete({ id })).pipe(
      map(() => ({ id }))
    );
  }
}
