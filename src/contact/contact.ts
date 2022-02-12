import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cv } from '../cv/cv';

@Entity()
export class Contact {
  @ApiProperty() @PrimaryGeneratedColumn() readonly id: number;
  @ApiProperty() @Column({ unique: true }) name: string;
  @ApiProperty() @Column({ default: '' }) text: string;
  @ApiProperty() @Column({ default: '' }) link: string;
  @ApiProperty() @Column({ default: '' }) icon: string;

  @ManyToMany(() => Cv, (cv: Cv) => cv.contacts, { cascade: true })
  cvs: Cv[];
}
