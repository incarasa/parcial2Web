/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */

import { EstudianteEntity } from "src/estudiante/estudiante.entity";
import { ReseñaEntity } from "src/reseña/reseña.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActividadEntity {
 @PrimaryGeneratedColumn('uuid')
 id: string;

 @Column()
 titulo: string;

 @Column()
 fecha: string;

 @Column()
 cupoMaximo: number;

 @Column()
 estado: number;

 @OneToMany(() => ReseñaEntity, reseña => reseña.actividad)
  reseñas: ReseñaEntity[];

  @ManyToMany(() => EstudianteEntity, estudiante => estudiante.actividades)
    estudiantes: EstudianteEntity[];

}