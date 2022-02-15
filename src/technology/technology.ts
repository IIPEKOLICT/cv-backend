import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../project/project';
import { Cv } from '../cv/cv';

@Entity()
export class Technology {
  @ApiProperty() @PrimaryGeneratedColumn() readonly id: number;
  @ApiProperty() @Column({ unique: true }) name: string;
  @ApiProperty() @Column({ default: '' }) icon: string;

  @ManyToMany(() => Project, (project: Project) => project.technologies, {
    cascade: true,
  })
  projects: Project[];

  @ManyToMany(() => Cv, (cv: Cv) => cv.technologies, { cascade: true })
  cvs: Cv[];
}
