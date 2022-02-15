import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project';
import { Repository } from 'typeorm';
import { from, map, Observable } from 'rxjs';
import { ProjectDto } from './dto/project.dto';
import { DeleteResponseDto } from '../shared/delete-response.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}

  getAll(): Observable<Project[]> {
    return from(this.projectRepository.find());
  }

  async getOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({ id });
  }

  async create(dto: ProjectDto, preview: string): Promise<Observable<Project>> {
    const { name, description, repo, deploy, technologies } = dto;

    return from(
      this.projectRepository.save(
        this.projectRepository.create({
          name,
          description,
          repo,
          deploy,
          technologies,
          preview,
        })
      )
    );
  }

  async change(
    id: number,
    dto: ProjectDto,
    preview: string
  ): Promise<Observable<Project>> {
    const project: Project = await this.getOne(id);

    project.name = dto.name;
    project.description = dto.description;
    project.deploy = dto.deploy;
    project.repo = dto.repo;
    project.technologies = dto.technologies;

    if (preview) {
      project.preview = preview;
    }

    return from(this.projectRepository.save(project));
  }

  delete(id: number): Observable<DeleteResponseDto> {
    return from(this.projectRepository.delete({ id })).pipe(
      map(() => ({ id }))
    );
  }
}
