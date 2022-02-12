import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cv } from './cv';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable } from 'rxjs';
import { CvDto } from './dto/cv.dto';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv) private readonly cvRepository: Repository<Cv>
  ) {}

  getAll(): Observable<Cv[]> {
    return from(this.cvRepository.find());
  }

  async getOne(id: number): Promise<Cv> {
    return this.cvRepository.findOne({ id });
  }

  getCurrent(id: number): Observable<Cv> {
    return from(this.getOne(id));
  }

  create(dto: CvDto, photo: string): Observable<Cv> {
    return from(
      this.cvRepository.save(this.cvRepository.create({ ...dto, photo }))
    );
  }

  async change(id: number, dto: CvDto, photo: string): Promise<Observable<Cv>> {
    const cv = await this.getOne(id);

    cv.name = dto.name;
    cv.job = dto.job;
    cv.about = dto.about;
    cv.english = dto.english;
    cv.contacts = dto.contacts;
    cv.educations = dto.educations;
    cv.employments = dto.employments;
    cv.projects = dto.projects;
    cv.technologies = dto.technologies;

    if (photo) {
      cv.photo = photo;
    }

    return from(this.cvRepository.save(cv));
  }

  delete(id: number): Observable<DeleteResponseDto> {
    return from(this.cvRepository.delete({ id })).pipe(map(() => ({ id })));
  }
}
